const dingSound = document.getElementById('sound');
const musicSelect = document.getElementById('music-select');
const audio = document.getElementById('music');
const blessings = [
  "幸福安康，万事如意！",
  "心想事成，好运连连！",
  "平安喜乐，所求皆如愿！"
];
let mainCountdownTimer = null;

//流星
function star(count = 200) {
  const container = document.createElement('div');
  container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;';
  document.body.appendChild(container);

  const stars = ['💥', '✨', '•', '*',]; //

  for (let i = 0; i < count; i++) {
    const meteor = document.createElement('div');
    meteor.className = 'starfall';
    meteor.textContent = stars[Math.floor(Math.random() * stars.length)];

    // 从右上角区域开始
    meteor.style.right = `${Math.random() * 60}%`; // 右侧 0%~60%
    meteor.style.top = `${-20 - Math.random() * 100}px`; // 略微错开起始高度

    // 随机大小
    const size = 0.8 + Math.random() * 1.5;
    meteor.style.fontSize = `${size}rem`;

    // 随机动画参数
    const duration = 2 + Math.random() * 4; // 2~6秒
    const delay = Math.random() * 5;

    //
    meteor.style.animation = `star-animation ${duration}s cubic-bezier(0.2, 0, 0.8, 1) ${delay}s infinite`;

    container.appendChild(meteor);
  }
}

//  倒计时
function countdown1() {
  const now = new Date();
  const next = new Date(2026, 1, 17,0,0,  0);
  const diff = next - now;
  if (diff <= 10000) {
  speed1();
}

  const totalSec = Math.floor(diff / 1000);
  const days = Math.floor(totalSec / 86400);
  const hours = Math.floor((totalSec % 86400) / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;

  document.getElementById('countdown').innerHTML = `
    <p>距离2026丙午马年春节还有：</p>
    <p>${days}日 ${hours}时 ${mins}分 ${secs}秒</p>
  `;
}
countdown1();
mainCountdownTimer=setInterval(countdown1, 1000);
function speed1(){
    if (mainCountdownTimer !== null) {
            clearInterval(mainCountdownTimer);
            mainCountdownTimer = null; // 避免重复清除
        }
    // 清空页面
    // 1. 清空页面
    document.body.innerHTML = '';

    // 2. 重置 body 样式
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.background = 'none'; // 确保无干扰

    // 3. 创建背景容器
    const bgContainer = document.createElement('div');
    bgContainer.id = 'blurred-bg';
    Object.assign(bgContainer.style, {
        position: 'fixed',
        top: '-20px',      // 扩大边界，防止模糊裁剪
        left: '-20px',
        width: 'calc(100% + 40px)',
        height: 'calc(100% + 40px)',
        backgroundImage: "url('image1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'blur(20px)',           // 初始高度模糊
        opacity: '1',
        zIndex: '-1',
        transition: 'filter 1.2s ease-out, opacity 1.2s ease-out'
    });

    document.body.appendChild(bgContainer);

    // 4. 触发过渡：从模糊 → 清晰
    setTimeout(() => {
        bgContainer.style.filter = 'blur(0px)';
    }, 50);


    // 创建倒计时显示元素
    const a1 = document.createElement('div');
    a1.classList.add('animate11');

    a1.textContent = 10;
    document.body.appendChild(a1); // 必须添加到 DOM！
    let countdown2 = 10;
    const timer = setInterval(() => {
        countdown2--;
        a1.textContent = countdown2; //

        if (countdown2 <= 0) {
            clearInterval(timer);

            // 2. 重置 body 样式
            document.body.style.margin = '0';
            document.body.style.padding = '0';
            document.body.style.background = 'none'; // 确保无干扰

            // 3. 创建背景容器
            const bgContainer = document.createElement('div');
            bgContainer.id = 'blurred-bg';
            Object.assign(bgContainer.style, {
                position: 'fixed',
                top: '-20px',      // 扩大边界，防止模糊裁剪
                left: '-20px',
                width: 'calc(100% + 40px)',
                height: 'calc(100% + 40px)',
                backgroundImage: "url('image3.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(20px)',           // 初始高度模糊
                opacity: '1',
                zIndex: '-1',
                transition: 'filter 1.2s ease-out, opacity 1.2s ease-out'
            });

            document.body.appendChild(bgContainer);

            // 4. 触发过渡：从模糊 → 清晰
            setTimeout(() => {
                bgContainer.style.filter = 'blur(0px)';
            }, 50);
            a1.remove();
            const b1 = document.createElement('div');
            document.body.appendChild(b1); // 必须添加到 DOM！
            b1.classList.add('animate12');
            b1.textContent = '新春！平安顺遂！';
            b1.classList.add('animate13');
            star(150);
            // 倒计时真正结束，此时才执行烟花
            const c1 = document.createElement('canvas');
            const c2 = document.createElement('canvas');
            const c3 = document.createElement('canvas');
            [c1, c2, c3].forEach(c => {
                c.style.position = 'absolute';
                c.style.top = '0';
                c.style.left = '0';
                c.style.pointerEvents = 'none'; // 防止遮挡
                document.body.appendChild(c);
            });

            f(); // 启动烟花动画

        }
    }, 1000);
}

//控制快进
// 获取按钮
const igniteBtn = document.getElementById('speed');
// 点击事件：点燃引信，然后触发倒计时
igniteBtn.addEventListener('click', () => {
  // 添加“点燃”状态
  const music = document.getElementById('music');
  music.pause();
  igniteBtn.classList.add('igniting');
  const sound = new Audio('ignite-sound.mp3');
  sound.loop = true;
  sound.play();
  // 延迟执行，让动画播放完再跳转
  setTimeout(() => {
    // 停止主倒计时轮询
    if (mainCountdownTimer !== null) {
      clearInterval(mainCountdownTimer);
      mainCountdownTimer = null;
    }

    // 执行倒计时结束流程
    speed1();

    // 移除按钮
    igniteBtn.remove();
  }, 2000); // 与动画时间同步
});
//点击好运
document.getElementById('Btn').addEventListener('click', function () {
  const blessingEl = document.getElementById('blessing');

  const randomText = blessings[Math.floor(Math.random() * blessings.length)];
  
  blessingEl.textContent = randomText;
  blessingEl.classList.remove('animate'); //动画重置
  void blessingEl.offsetWidth; //强制重排
  blessingEl.classList.add('animate');

  // 新增：生成竖排文字弹幕
const texts = ["福", "吉", "祥", "瑞", "春", "安", "顺", "乐", "财", "喜"];
const randomChar = texts[Math.floor(Math.random() * texts.length)];
const fireworkEl = document.createElement('div');
fireworkEl.className = 'text-firework';
fireworkEl.textContent = randomChar;
fireworkEl.style.left = `${Math.random() * 100}%`; // 随机水平位置
document.getElementById('text-fireworks').appendChild(fireworkEl);

// 动画结束后移除
setTimeout(() => {
  if (fireworkEl.parentNode) {
    fireworkEl.parentNode.removeChild(fireworkEl);
  }
}, 3000); // 与动画时长一致
});

//bgm控制
musicSelect.addEventListener('change', function () {
  const url = this.value;
  if (url) {
    audio.src = url;
    audio.play().catch(e => console.log("自动播放被阻止，请点击交互后播放"));
  } else {
    audio.pause();
    audio.currentTime = 0;
  }
});

//创建雪花
function createSnowflakes(count =200) {
  //找到HTML里放雪花的“容器”
  const container = document.getElementById('snow');

  //定义雪花数组
  const snowflakes = ['❄️', '❅', '❆','•', '·'];

  // 循环 'count' 次
  for (let i = 0; i < count; i++) {
    //2. 创建一个新的 <div> 元素
    const flake = document.createElement('div');
    flake.className = 'snowflake'; // 给它加上上面定义的CSS样式
    //随机选一个雪花形状
    flake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];

    // 3. 给这片雪花“个性化”设置
    // 随机水平位置 (0% 到 100%)
    flake.style.left = `${Math.random() * 100}%`;



    //随机大小 (0.8rem 到 2.3rem)
    const size = Math.random() * 2 + 1;
    flake.style.fontSize = `${size}rem`;

    //4. 设置动画的速度开始时间
    const duration = Math.random() * 8+5 ; //下落时间
    const delay = Math.random() * 5;        //0到5秒之间
    //CSS动画
    const drift = (Math.random() - 0.5) * 40; //横向漂移
    flake.style.setProperty('--drift', drift);
    flake.style.animation = `snowfall ${duration}s cubic-bezier(0.1, 0.6, 0.8, 0.6) ${delay}s infinite`;

    //5.把 flake 这个元素，添加到 container 这个容器的最后面
    container.appendChild(flake);
  }
}
window.addEventListener('load', () => {
  createSnowflakes();
});

//点按烟花特效
(function()
{
    const canvas=document.getElementById('fireworks-canvas');
    const ctx=canvas.getContext('2d');
    let animationId=null;
    const particles=[];

    //设置画布尺寸
    function resizeCanvas(){
        canvas.width=window.innerWidth;
        canvas.height=window.innerHeight;
    }
    window.addEventListener('resize',resizeCanvas);
    resizeCanvas();

    //粒子
    class Particle{
        constructor(x,y){
            this.x=x;
            this.y=y;
            this.vx=(Math.random()-0.5)*10;
            this.vy=(Math.random()-0.5)*10-8;
            this.color=`hsl(${Math.random() * 360}, 100%, 60%)`;// 随机鲜艳颜色
            this.size=Math.random()*3+1;
            this.life=1.0;
            this.decay=Math.random()*0.03+0.015;
        }
        update(){
            this.vy += 0.15; // 重力
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
        }
        draw() {
          ctx.save();
          ctx.globalAlpha = this.life;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }

        isDead() {
          return this.life <= 0;
        }
    }

    function createFirework(x, y) {
        const count = 80 + Math.floor(Math.random() * 40); // 80-120个粒子
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(x, y));
        }
  }

    //动画
    function animate(){
        ctx.clearRect(0,0,canvas.width,canvas.height);

        //更新绘制粒子
        for(let i=particles.length-1;i>=0;i--){
            particles[i].update();
            particles[i].draw();
            if(particles[i].isDead()){
                particles.splice(i,1);
            }
        }

        animationId=requestAnimationFrame(animate);
    }

    //启动
    animate();

    //监听
    function handleInteraction(e){
        e.preventDefault();
        let x,y;
        if(e.type.startsWith('touch')){
            x=e.touches[0].clientX;
            y=e.touches[0].clientY;
        }
        else {
            x = e.clientX;
            y = e.clientY;
        }
        createFirework(x, y);
    }

    //支持鼠标;手机
    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);
}
)();

//点击区域涟漪效果
document.addEventListener('click', function(e) {
  const ripple = document.createElement('div');
  ripple.className = 'ripple';
  ripple.style.left = `${e.clientX}px`;
  ripple.style.top = `${e.clientY}px`;
  document.body.appendChild(ripple);

  // 动画结束后移除
  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 600);
});


function f(){
function GetRequest() {
      var url = decodeURI(location.search); //获取url中"?"符后的字串
      var theRequest = new Object();
      if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
      }
      return theRequest;
    }
    class Shard {
      constructor(x, y, hue) {
        this.x = x;
        this.y = y;
        this.hue = hue;
        this.lightness = 50;
        this.size = 15 + Math.random() * 10;
        const angle = Math.random() * 2 * Math.PI;
        const blastSpeed = 1 + Math.random() * 6;
        this.xSpeed = Math.cos(angle) * blastSpeed;
        this.ySpeed = Math.sin(angle) * blastSpeed;
        this.target = getTarget();
        this.ttl = 100;
        this.timer = 0;
      }
      draw() {
        ctx2.fillStyle = `hsl(${this.hue}, 100%, ${this.lightness}%)`;
        ctx2.beginPath();
        ctx2.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx2.closePath();
        ctx2.fill();
      }
      update() {
        if (this.target) {
          const dx = this.target.x - this.x;
          const dy = this.target.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const a = Math.atan2(dy, dx);
          const tx = Math.cos(a) * 5;
          const ty = Math.sin(a) * 5;
          this.size = lerp(this.size, 1.5, 0.05);

          if (dist < 5) {
            this.lightness = lerp(this.lightness, 100, 0.01);
            this.xSpeed = this.ySpeed = 0;
            this.x = lerp(this.x, this.target.x + fidelity / 2, 0.05);
            this.y = lerp(this.y, this.target.y + fidelity / 2, 0.05);
            this.timer += 1;
          } else
            if (dist < 10) {
              this.lightness = lerp(this.lightness, 100, 0.01);
              this.xSpeed = lerp(this.xSpeed, tx, 0.1);
              this.ySpeed = lerp(this.ySpeed, ty, 0.1);
              this.timer += 1;
            } else {
              this.xSpeed = lerp(this.xSpeed, tx, 0.02);
              this.ySpeed = lerp(this.ySpeed, ty, 0.02);
            }
        } else {
          this.ySpeed += 0.05;
          //this.xSpeed = lerp(this.xSpeed, 0, 0.1);
          this.size = lerp(this.size, 1, 0.05);

          if (this.y > c2.height) {
            shards.forEach((shard, idx) => {
              if (shard === this) {
                shards.splice(idx, 1);
              }
            });
          }
        }
        this.x = this.x + this.xSpeed;
        this.y = this.y + this.ySpeed;
      }
    }

    class Rocket {
      constructor() {
        const quarterW = c2.width / 4;
        this.x = quarterW + Math.random() * (c2.width - quarterW);
        this.y = c2.height - 15;
        this.angle = Math.random() * Math.PI / 4 - Math.PI / 6;
        this.blastSpeed = 6 + Math.random() * 7;
        this.shardCount = 15 + Math.floor(Math.random() * 15);
        this.xSpeed = Math.sin(this.angle) * this.blastSpeed;
        this.ySpeed = -Math.cos(this.angle) * this.blastSpeed;
        this.hue = Math.floor(Math.random() * 360);
        this.trail = [];
      }
      draw() {
        ctx2.save();
        ctx2.translate(this.x, this.y);
        ctx2.rotate(Math.atan2(this.ySpeed, this.xSpeed) + Math.PI / 2);
        ctx2.fillStyle = `hsl(${this.hue}, 100%, 50%)`;
        ctx2.fillRect(0, 0, 5, 15);
        ctx2.restore();
      }
      update() {
        this.x = this.x + this.xSpeed;
        this.y = this.y + this.ySpeed;
        this.ySpeed += 0.1;
      }

      explode() {
        for (let i = 0; i < 70; i++) {
          shards.push(new Shard(this.x, this.y, this.hue));
        }
      }
    }

    console.log(GetRequest('val').val)
    // INITIALIZATION
    const [c1, c2, c3] = document.querySelectorAll('canvas');
    const [ctx1, ctx2, ctx3] = [c1, c2, c3].map(c => c.getContext('2d'));
    let fontSize = 200;
    const rockets = [];
    const shards = [];
    const targets = [];
    const fidelity = 3;
    let counter = 0;
    c2.width = c3.width = window.innerWidth;
    c2.height = c3.height = window.innerHeight;
    ctx1.fillStyle = '#000';
    const text = '2026新春快乐！'
    let textWidth = 99999999;

    while (textWidth > window.innerWidth) {
      ctx1.font = `900 ${fontSize--}px Arial`;
      textWidth = ctx1.measureText(text).width;
    }

    c1.width = textWidth;
    c1.height = fontSize * 1.5;
    ctx1.font = `900 ${fontSize}px Arial`;
    ctx1.fillText(text, 0, fontSize);
    const imgData = ctx1.getImageData(0, 0, c1.width, c1.height);
    for (let i = 0, max = imgData.data.length; i < max; i += 4) {
      const alpha = imgData.data[i + 3];
      const x = Math.floor(i / 4) % imgData.width;
      const y = Math.floor(i / 4 / imgData.width);

      if (alpha && x % fidelity === 0 && y % fidelity === 0) {
        targets.push({ x, y });
      }
    }

    ctx3.fillStyle = 'pink';
    ctx3.shadowColor = 'pink';
    ctx3.shadowBlur = 25;
c1.style.display = 'none'; // 隐藏
    // ANIMATION LOOP
    (function loop() {

      ctx2.fillStyle = "rgba(0, 0, 0, .1)";
      ctx2.fillRect(0, 0, c2.width, c2.height);
      ctx2.clearRect(0, 0, c2.width, c2.height);
      counter += 1;

      if (counter % 15 === 0) {
        rockets.push(new Rocket());
      }
      rockets.forEach((r, i) => {
        r.draw();
        r.update();
        if (r.ySpeed > 0) {
          r.explode();
          rockets.splice(i, 1);
        }
      });

      shards.forEach((s, i) => {
        s.draw();
        s.update();

        if (s.timer >= s.ttl || s.lightness >= 99) {
          ctx3.fillRect(s.target.x, s.target.y, fidelity + 1, fidelity + 1);
          shards.splice(i, 1);
        }
      });

      requestAnimationFrame(loop);
    })();

    // HELPER FUNCTIONS
    const lerp = (a, b, t) => Math.abs(b - a) > 0.1 ? a + t * (b - a) : b;

    function getTarget() {
      if (targets.length > 0) {
        const idx = Math.floor(Math.random() * targets.length);
        let { x, y } = targets[idx];
        targets.splice(idx, 1);

        x += c2.width / 2 - textWidth / 2;
        y += c2.height / 2 - fontSize / 2;

        return { x, y };
      }
    }
}