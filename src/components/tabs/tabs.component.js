class Links extends Component {
  constructor() {
    super();
  }

  static getIcon(link) {
    const defaultColor = CONFIG.palette.base;

    return link.icon
      ? `<i class="ti ti-${link.icon} link-icon"
            style="color: ${link.icon_color ?? defaultColor}"></i>`
      : "";
  }

  static getAll(tabName, tabs) {
    const { categories } = tabs.find((f) => f.name === tabName);

    return `
      ${categories
        .map(({ name, links }) => {
          return `
          <li>
            <h1>${name}</h1>
              <div class="links-wrapper">
              ${links
                .map(
                  (link) => `
                  <div class="link-info">
                    <a href="${link.url}" target="_blank">
                      ${Links.getIcon(link)}
                      ${link.name ? `<p class="link-name">${link.name}</p>` : ""}
                    </a>
                </div>`,
                )
                .join("")}
            </div>
          </li>`;
        })
        .join("")}
    `;
  }
}

class Category extends Component {
  constructor() {
    super();
  }

  static getBackgroundStyle(url) {
    return `style="background-image: url(${url}); background-repeat: no-repeat;background-size: contain;"`;
  }

  static getAll(tabs) {
    return `
      ${tabs
        .map(({ name, background_url }, index) => {
          return `<ul class="${name}" ${Category.getBackgroundStyle(background_url)} ${index == 0 ? "active" : ""}>
            <div class="banner"></div>
            <div class="links">${Links.getAll(name, tabs)}</div>
          </ul>`;
        })
        .join("")}
    `;
  }
}

class Tabs extends Component {
  refs = {};

  constructor() {
    super();
    this.tabs = CONFIG.tabs;
  }

  imports() {
    return [
      this.resources.icons.material,
      this.resources.icons.tabler,
      this.resources.fonts.roboto,
      this.resources.fonts.raleway,
      this.resources.libs.awoo,
    ];
  }

  style() {
    return `
      status-bar {
        font-family: 'JetBrains Mono', 'Fira Mono', 'Roboto Mono', monospace;
        font-size: 1rem;
        color: #cdd6f4;
        background: linear-gradient(90deg, #1e1e2e 80%, #313244 100%);
        border-radius: 0.6rem;
        box-shadow: 0 2px 12px #18182566;
        margin: 1.5em 1em 1em 1em;
        padding: 0.2em 1.5em;
        letter-spacing: 0.08em;
        border: 1.5px solid #45475a;
        text-shadow: 0 1px 6px #585b7088;
        height: 30px;
        min-width: 120px;
        position: absolute;
        top: 430px;
        right: 40px;
        transition: box-shadow 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
      }
        
      #panels, #panels ul,
      #panels .links {
        position: absolute;
      }

      .nav {
        color: #fff;
      }

      #panels {
        border-radius: 15px;
        width: 95%;
        max-width: 1200px;
        height: 420px;
        right: 0;
        left: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
        background: ${CONFIG.palette.base};
      }

      .categories {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        border-radius: 15px;
      }

      .categories ul {
        --panelbg: transparent;
        --flavour: var(--accent);
        width: 100%;
        height: 100%;
        right: 100%;
        background: ${CONFIG.palette.base} url("../img/bg-1.gif") repeat left;
        transition: all .6s;
      }

      @keyframes scroll {
        50% {
          background-position-x: -240px;
        }
      }

      .categories ul:nth-child(1) {
        --flavour: ${CONFIG.palette.sapphire};
      }

      .categories ul:nth-child(2) {
        --flavour: ${CONFIG.palette.peach};
      }

      .categories ul:nth-child(3) {
        --flavour: ${CONFIG.palette.red};
      }

      .categories ul:nth-child(4) {
        --flavour: ${CONFIG.palette.blue};
      }
      .categories ul:nth-child(5) {
        --flavour: ${CONFIG.palette.mauve};
      }

      .categories ul .links {
        box-shadow: inset -1px 0 var(--flavour);
      }

      .categories ul[active] {
        right: 0;
        z-index: 1;
      }

      .categories .links {
        right: 0;
        width: 70%;
        height: 100%;
        background: ${CONFIG.palette.base};
        padding: 1% 1% 0.5% 1%;
        overflow-y: auto;
        overflow-x: hidden;
        box-sizing: border-box;
      }

      .categories .links-wrapper {
        display: flex;
        flex-wrap: wrap;
        gap: 0.8em 1em;
        width: 100%;
        height: auto;
        box-sizing: border-box;
        overflow: hidden;
        padding-bottom: 0.4em;
        align-items: flex-start;
        justify-content: flex-start;
      }

      .categories .links::-webkit-scrollbar {
        width: 8px;
      }

      .categories .links::-webkit-scrollbar-track {
        background: ${CONFIG.palette.mantle};
        border-radius: 4px;
      }

      .categories .links::-webkit-scrollbar-thumb {
        background: ${CONFIG.palette.surface1};
        border-radius: 4px;
      }

      .categories .links::-webkit-scrollbar-thumb:hover {
        background: ${CONFIG.palette.surface2};
      }

      .categories .links li {
        list-style: none;
        margin-bottom: 1.2em;
      }

      .categories ul .links a {
        color: ${CONFIG.palette.text};
        text-decoration: none;
        font: 700 18px 'Roboto', sans-serif;
        transition: all .2s;
        display: inline-flex;
        align-items: center;
        padding: .4em .8em;
        background: ${CONFIG.palette.mantle};
        box-shadow: 0 4px ${CONFIG.palette.mantle}, 0 5px 5px rgb(0 0 0 / 20%);
        border-radius: 15px;
        justify-content: flex-start;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-height: 2em;
        box-sizing: border-box;
        width: auto;
        min-width: fit-content;
      }

      .categories .link-info {
        display: flex;
        width: auto;
        justify-content: flex-start;
      }

      .categories .link-info:not(:last-child) { margin-right: 0; }

      .categories ul .links a:hover {
        transform: translate(0, 4px);
        box-shadow: 0 0 rgba(0, 0, 0, 0.25), 0 0 0 rgba(0, 0, 0, .5), 0 -0px 5px rgba(0, 0, 0, .1);
        color: var(--flavour);
      }

      .categories ul::after {
        content: attr(class);
        position: absolute;
        display: flex;
        text-transform: uppercase;
        overflow-wrap: break-word;
        width: 25px;
        height: 250px;
        padding: 1em;
        margin: auto;
        border-radius: 15px;
        box-shadow: inset 0 0 0 2px var(--flavour);
        left: calc(15% - 42.5px);
        bottom: 0;
        top: 0;
        background: linear-gradient(to top, rgb(50 48 47 / 90%), transparent);
        color: var(--flavour);
        letter-spacing: 1px;
        font: 500 30px 'Nunito', sans-serif;
        text-align: center;
        flex-wrap: wrap;
        word-break: break-all;
        align-items: center;
        backdrop-filter: blur(3px);
      }

      .categories .links li h1 {
        color: ${CONFIG.palette.text};
        opacity: 0.5;
        font-size: 13px;
        margin-bottom: 1em;
        font-weight: 600;
        letter-spacing: 1px;
        text-transform: uppercase;
        font-family: 'Raleway', sans-serif;
      }

      .categories .link-icon {
        font-size: 27px;
        color: ${CONFIG.palette.text};
      }

      .categories .link-icon + .link-name {
        margin-left: 10px;
      }

      .ti {
        animation: fadeInAnimation ease .5s;
        animation-iteration-count: 1;
        animation-fill-mode: forwards;
        height: 27px;
        width: 27px;
      }

      @keyframes fadeInAnimation {
        0% {
          opacity: 0;
        }
        100% {
          opacity: 1;
        }
      }
    `;
  }

  template() {
    return `
      <div id="links" class="-">
        <div id="panels">
          <div class="categories">
            ${Category.getAll(this.tabs)}
          </div>
          <status-bar class="!-"></status-bar>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}
