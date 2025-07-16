class DigitalClock extends Component {
  refs = {
    digitalClock: "#digitalClock"
  };

  constructor() {
    super();
    this.showDate = false; // Toggle between time and date
  }

  imports() {
    return [this.resources.fonts.roboto];
  }

  style() {
    return `
      .digital-clock.catppuccin-mocha {
        font-family: 'JetBrains Mono', 'Fira Mono', 'Roboto Mono', monospace;
        font-size: 1rem;
        line-height: 1.2em;
        color: #cdd6f4;
        background: linear-gradient(90deg, #1e1e2e 80%, #313244 100%);
        border-radius: 0.6rem;
        box-shadow: 0 2px 12px #18182566;
        margin: 0 1em 0 1em;
        padding: 0.2em 0.7em;
        letter-spacing: 0.08em;
        border: 1.5px solid #45475a;
        text-shadow: 0 1px 6px #585b7088;
        min-width: 120px;
        max-width: 900px;
        transition: box-shadow 0.2s;
        display: flex;
        align-items: center;
        vertical-align: middle;
        justify-content: flex-end;
        cursor: pointer;
        user-select: none;
        white-space: normal;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
      }

      .digital-clock.catppuccin-mocha * {
        vertical-align: middle;
        line-height: 1.2em;
      }

      .digital-clock.catppuccin-mocha:hover {
        box-shadow: 0 4px 16px #18182588;
        border-color: #6c7086;
      }
    `;
  }

  template() {
    return `
      <div class="digital-clock catppuccin-mocha" id="digitalClock"></div>
    `;
  }

  updateDigitalClock() {
    const now = new Date();
    
    if (this.showDate) {
      // Display date format: Mon, June 5
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June',
                         'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const dayName = dayNames[now.getDay()];
      const monthName = monthNames[now.getMonth()];
      const date = now.getDate();
      
      this.refs.digitalClock.textContent = `${dayName}, ${monthName} ${date}`;
    } else {
      // Display time format: 12:34:56 PM
      let h = now.getHours();
      const m = now.getMinutes().toString().padStart(2, '0');
      const s = now.getSeconds().toString().padStart(2, '0');
      const ampm = h >= 12 ? 'PM' : 'AM';
      h = h % 12;
      h = h ? h : 12;
      h = h.toString().padStart(2, '0');
      this.refs.digitalClock.textContent = `${h}:${m}:${s} ${ampm}`;
    }
  }

  toggleDisplay() {
    this.showDate = !this.showDate;
    this.updateDigitalClock();
  }

  connectedCallback() {
    this.render().then(() => {
      // Initialize clock
      this.updateDigitalClock();
      setInterval(() => this.updateDigitalClock(), 1000);
      
      // Add click event listener for toggle
      this.refs.digitalClock.addEventListener('click', () => {
        this.toggleDisplay();
      });
    });
  }
}
