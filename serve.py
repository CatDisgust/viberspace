"""ViberSpace 网页服务器（本地预览和 Railway 线上都用它）。

和 python -m http.server 一样提供静态文件，另外做两件事防止浏览器用旧文件：
1. 所有响应都带 Cache-Control: no-cache，让浏览器每次检查有没有更新；
2. 返回首页时，自动给 js/ 和 css/ 的链接加上版本号（文件内容的哈希），
   比如 js/data.js -> js/data.js?v=3f2a9c1e。文件一改版本号就变，
   即使 Cloudflare 之类的 CDN 让浏览器缓存几个小时，也会立刻拿到新文件。

用法：python3 serve.py [端口]
端口优先级：命令行参数 > 环境变量 PORT（Railway 会自动设置）> 默认 5173
"""
import functools
import hashlib
import http.server
import os
import re
import sys

ROOT = os.path.dirname(os.path.abspath(__file__))
ASSET_LINK = re.compile(r'((?:src|href)=")((?:js|css)/[^"?#]+)(")')


def file_version(rel_path):
    try:
        with open(os.path.join(ROOT, rel_path), "rb") as f:
            return hashlib.md5(f.read()).hexdigest()[:10]
    except OSError:
        return None


def versioned_index():
    with open(os.path.join(ROOT, "index.html"), encoding="utf-8") as f:
        html = f.read()

    def add_version(m):
        v = file_version(m.group(2))
        return f"{m.group(1)}{m.group(2)}?v={v}{m.group(3)}" if v else m.group(0)

    return ASSET_LINK.sub(add_version, html).encode("utf-8")


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()

    def do_GET(self):
        path = self.path.split("?", 1)[0].split("#", 1)[0]
        if path in ("/", "/index.html"):
            body = versioned_index()
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().do_GET()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get("PORT", 5173))
    handler = functools.partial(Handler, directory=ROOT)
    with http.server.ThreadingHTTPServer(("0.0.0.0", port), handler) as httpd:
        print(f"ViberSpace 运行中：http://localhost:{port}", flush=True)
        httpd.serve_forever()
