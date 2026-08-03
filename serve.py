# Local dev server: static files + frame-upload endpoint for hero-loop rendering.
# Dev-only tool; binds to localhost.
import http.server
import os
import re

ROOT = os.path.dirname(os.path.abspath(__file__))


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        m = re.match(r"^/save/([\w.-]+)$", self.path)
        if not m:
            self.send_response(404)
            self.end_headers()
            return
        n = int(self.headers.get("Content-Length", 0))
        data = self.rfile.read(n)
        frames = os.path.join(ROOT, "kit", "frames")
        os.makedirs(frames, exist_ok=True)
        with open(os.path.join(frames, m.group(1)), "wb") as f:
            f.write(data)
        self.send_response(200)
        self.send_header("Content-Length", "2")
        self.end_headers()
        self.wfile.write(b"ok")

    def log_message(self, *a):
        pass


if __name__ == "__main__":
    os.chdir(ROOT)
    http.server.ThreadingHTTPServer(("127.0.0.1", 8123), Handler).serve_forever()
