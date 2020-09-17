
# # -*- coding: utf-8 -*-
import sys
import time
sys.path.append("/usr/local/lib/python3.7/site-packages")
import cv2


last = 0


def TakePhoto(filename):
    global last
    c_last = int(round(time.time() * 1000))
    if c_last - last >= 8000:
        # print("=======")
        last = c_last
        cap = cv2.VideoCapture(0)  # 创建一个 VideoCapture 对象
        start = int(round(time.time() * 1000))
        while(cap.isOpened()):  # 循环读取每一帧
            # 返回两个参数，第一个是bool是否正常打开，第二个是照片数组，如果只设置一个则变成一个tumple包含bool和图片
            ret_flag, Vshow = cap.read()
            # cv2.imshow("Capture_Test", Vshow)  # 窗口显示，显示名为 Capture_Test
            k = cv2.waitKey(1) & 0xFF  # 每帧数据延时 1ms，延时不能为 0，否则读取的结果会是静态帧
            end = int(round(time.time() * 1000))
            if end - start >= 2000:  # 若检测到按键 ‘s’，打印字符串
                cv2.imwrite(filename, Vshow, [
                            int(cv2.IMWRITE_JPEG_QUALITY), 30])
                break
        cap.release()  # 释放摄像头
        cv2.destroyAllWindows()  # 删除建立的全部窗口


from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import urlparse, parse_qs


class RequestHandler(BaseHTTPRequestHandler):
    '''处理请求并返回页面'''

    # 页面模板
    Page = '''<html>a</html>'''

    # 处理一个GET请求
    def do_GET(self):
        query = urlparse(self.path).query
        file_name = parse_qs(query).get("file", ["_photo_.jpg"])[0]
        # print('111111111',self.path,query,file_name)
        self.send_response(200)
        self.send_header("Content-Type", "text/html")
        self.send_header("Content-Length", str(len(self.Page)))
        self.end_headers()
        self.wfile.write(self.Page.encode('utf-8'))
        TakePhoto(file_name)


if __name__ == '__main__':
    serverAddress = ('', 8486)
    server = HTTPServer(serverAddress, RequestHandler)
    server.serve_forever()
