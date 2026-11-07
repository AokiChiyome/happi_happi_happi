import http.server
import socketserver
import webbrowser
import os
import sys

PORT = 5500

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Enable CORS and disable cache during development so CSV updates immediately
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate')
        super().end_headers()

def run_server():
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Try preferred port, or fall back to an available one
    port = PORT
    for attempt in range(5):
        try:
            with socketserver.TCPServer(("", port), CustomHTTPRequestHandler) as httpd:
                url = f"http://localhost:{port}"
                print("=" * 60)
                print(f"  💕 HÔM NAY EM MUỐN ĂN GÌ? 💕")
                print(f"  Web dang chay tai: {url}")
                print(f"  Trinh duyet se tu dong mo len trong giay lat...")
                print(f"  Nhan Ctrl + C de dung server bat cu luc nao.")
                print("=" * 60)
                webbrowser.open(url)
                httpd.serve_forever()
                break
        except OSError:
            port += 1
            if attempt == 4:
                print(f"Khong the mo cong tu {PORT} den {port}. Vui long kiem tra lai.")

if __name__ == "__main__":
    try:
        run_server()
    except KeyboardInterrupt:
        print("\nDa dung server. Chuc hai ban co bua an that ngon mieng! 💕")
        sys.exit(0)
