## HostlocSign
[Node.JS] Hostloc 每日签到脚本  
看不太懂 Discuz 的架构，所以直接用 Selenium 了  
写给自己用的，看个乐子就好

## 使用
需要先安装 `google-chrome`  
```
wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
apt install ./google-chrome-stable_current_amd64.deb -y
rm google-chrome-stable_current_amd64.deb
```
复制 `.env.example` 为 `.env`  
然后填上用户名和密码找个 screen 之类的东西执行 `node main.js` 就行了  
执行后和每天 0 点会执行签到，有需要看着改  

## 后记
大概之后不会维护，所以看个乐就好