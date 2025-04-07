document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('mermaidInput');
  const output = document.getElementById('mermaidOutput');
  const downloadBtn = document.getElementById('downloadBtn');
  const themeToggle = document.getElementById('themeToggle');

  // 主题切换功能
  function setTheme(isDark) {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    // 更新Mermaid主题配置
    mermaid.initialize({
      startOnLoad: true,
      theme: isDark ? 'dark' : 'default',
      securityLevel: 'loose'
    });
    // 重新渲染当前图表
    const currentCode = input.value.trim();
    if (currentCode) {
      renderDiagram(currentCode);
    }
  }

  // 初始化主题
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);

  // 主题切换事件
  themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    setTheme(!isDark);
  });

  // 初始化mermaid配置
  mermaid.initialize({
    startOnLoad: true,
    theme: savedTheme === 'dark' ? 'dark' : 'default',
    securityLevel: 'loose'
  });

  // 实时渲染图表
  async function renderDiagram(code) {
    try {
      output.innerHTML = '';
      const { svg } = await mermaid.render('mermaid-diagram', code);
      output.innerHTML = svg;
      output.classList.add('fade-in');
      setTimeout(() => output.classList.remove('fade-in'), 300);
    } catch (error) {
      output.innerHTML = `<div class="error-message slide-in">渲染错误: ${error.message}</div>`;
    }
  }

  // 监听输入变化
  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const code = input.value.trim();
      if (code) {
        renderDiagram(code);
      } else {
        output.innerHTML = '';
      }
    }, 300);
  });

  // 下载SVG功能
  downloadBtn.addEventListener('click', async () => {
    const svg = output.querySelector('svg');
    if (!svg) {
      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-message slide-in';
      errorMsg.textContent = '请先生成图表';
      output.appendChild(errorMsg);
      setTimeout(() => errorMsg.remove(), 3000);
      return;
    }

    try {
      const fileNameInput = document.getElementById('fileNameInput');
      const fileName = fileNameInput.value.trim() || 'mermaid-diagram';

      const svgBlob = new Blob([svg.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.svg`;
      a.click();

      // 清理
      URL.revokeObjectURL(url);

      // 显示成功提示
      const successMsg = document.createElement('div');
      successMsg.className = 'success-message slide-in';
      successMsg.textContent = '下载成功！';
      output.appendChild(successMsg);
      setTimeout(() => successMsg.remove(), 3000);
    } catch (error) {
      const errorMsg = document.createElement('div');
      errorMsg.className = 'error-message slide-in';
      errorMsg.textContent = '导出SVG失败: ' + error.message;
      output.appendChild(errorMsg);
      setTimeout(() => errorMsg.remove(), 3000);
    }
  });

  // 添加示例代码
  const exampleCode = `graph TD\n    A[开始] --> B{是否有数据?}\n    B -->|是| C[处理数据]\n    B -->|否| D[获取数据]\n    C --> E[结束]\n    D --> B`;
  input.value = exampleCode;
  renderDiagram(exampleCode);
});