"""本地预览服务器：和 python -m http.server 一样，但让浏览器每次都检查文件有没有更新，
避免改完代码后浏览器还在用旧的缓存文件。

用法：python3 serve.py [端口]
端口优先级：命令行参数 > 环境变量 PORT（Railway 会自动设置）> 默认 5173
"""
import functools
import http.server
import os
import sys


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else int(os.environ.get("PORT", 5173))
    root = os.path.dirname(os.path.abspath(__file__))
    handler = functools.partial(NoCacheHandler, directory=root)
    with http.server.ThreadingHTTPServer(("0.0.0.0", port), handler) as httpd:
        print(f"ViberSpace 运行中：http://localhost:{port}", flush=True)
        httpd.serve_forever()
