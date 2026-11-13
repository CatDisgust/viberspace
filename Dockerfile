# Railway 部署用：纯静态网站，用 serve.py 提供文件，端口读取 Railway 设置的 PORT
FROM python:3.12-slim
WORKDIR /app
COPY . .
ENV PYTHONUNBUFFERED=1
CMD ["python", "serve.py"]
