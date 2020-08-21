# # -*- coding: utf-8 -*-
import sys
sys.path.append("/usr/local/lib/python3.7/site-packages")
import pyaudio,os
import wave
import math

def main(time,filePath):
    dir = os.path.dirname(filePath)
    if os.path.isdir(dir):
      audio_input(int(time),filePath)
    
def audio_input(ms,filename):

    chunk = 1024
    formats = pyaudio.paInt16
    channal = 1
    rate = 16000
    p = pyaudio.PyAudio()
    stream = p.open(format=formats,
                    channels=channal,
                    rate=rate,
                    input=True,
                    frames_per_buffer=chunk)

    #print("开始录音,请说话......")

    frames = []

    for i in range(0, math.ceil(rate / chunk * ms)):
        data = stream.read(chunk)
        frames.append(data)
    #print("录音结束,请闭嘴!")
    stream.stop_stream()
    stream.close()
    p.terminate()
    wf = wave.open(filename,'wb')
    wf.setnchannels(channal)
    wf.setsampwidth(p.get_sample_size(formats))
    wf.setframerate(rate)
    wf.writeframes(b''.join(frames))
    wf.close()


if __name__ == '__main__':
  if len(sys.argv) >= 3:
    main(sys.argv[1],sys.argv[2])


