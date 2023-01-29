import{_ as e,c as n,o as t,a as o}from"./app.8c94bc76.js";const m=JSON.parse('{"title":"Start with Sheweny","description":"","frontmatter":{},"headers":[{"level":2,"title":"Installing Node.js","slug":"installing-node-js","link":"#installing-node-js","children":[{"level":3,"title":"Installing on Windows","slug":"installing-on-windows","link":"#installing-on-windows","children":[]},{"level":3,"title":"Installing on macOS","slug":"installing-on-macos","link":"#installing-on-macos","children":[]},{"level":3,"title":"Installing on Linux","slug":"installing-on-linux","link":"#installing-on-linux","children":[]}]},{"level":2,"title":"Preparing the essentials","slug":"preparing-the-essentials","link":"#preparing-the-essentials","children":[{"level":3,"title":"Setting up a project folder","slug":"setting-up-a-project-folder","link":"#setting-up-a-project-folder","children":[]},{"level":3,"title":"Opening the command prompt","slug":"opening-the-command-prompt","link":"#opening-the-command-prompt","children":[]},{"level":3,"title":"Using the command prompt","slug":"using-the-command-prompt","link":"#using-the-command-prompt","children":[]}]},{"level":2,"title":"Installing sheweny","slug":"installing-sheweny","link":"#installing-sheweny","children":[]}],"relativePath":"guide/getting-started/Start.md","lastUpdated":1672135980000}'),a={name:"guide/getting-started/Start.md"},i=o('<h1 id="start-with-sheweny" tabindex="-1">Start with Sheweny <a class="header-anchor" href="#start-with-sheweny" aria-hidden="true">#</a></h1><h2 id="installing-node-js" tabindex="-1">Installing Node.js <a class="header-anchor" href="#installing-node-js" aria-hidden="true">#</a></h2><p>To use sheweny, you&#39;ll need to install Node.js. You can do so by going to <a href="https://nodejs.org/" target="_blank" rel="noreferrer">the Node.js website</a>.</p><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>If you <em>do</em> have Node installed, but it&#39;s an older version (i.e. anything below 16.6.0), then you must upgrade to the latest version. sheweny V1 requires Node v16.6.0 or higher.</p></div><h3 id="installing-on-windows" tabindex="-1">Installing on Windows <a class="header-anchor" href="#installing-on-windows" aria-hidden="true">#</a></h3><p>If you&#39;re developing on Windows, it&#39;s as simple as installing any other program. Go to <a href="https://nodejs.org/" target="_blank" rel="noreferrer">the Node.js website</a>, download the latest version, open up the downloaded file, and follow the steps from the installer.</p><h3 id="installing-on-macos" tabindex="-1">Installing on macOS <a class="header-anchor" href="#installing-on-macos" aria-hidden="true">#</a></h3><p>If you&#39;re developing on macOS, you have a few options. You can go to <a href="https://nodejs.org/" target="_blank" rel="noreferrer">the Node.js website</a>, download the latest version, double click the package installer, and follow the instructions. You can also use a package manager like <a href="https://brew.sh/" target="_blank" rel="noreferrer">Homebrew</a> with the command <code>brew install node</code>.</p><h3 id="installing-on-linux" tabindex="-1">Installing on Linux <a class="header-anchor" href="#installing-on-linux" aria-hidden="true">#</a></h3><p>If you&#39;re developing on Linux, you may consult <a href="https://nodejs.org/en/download/package-manager/" target="_blank" rel="noreferrer">this page</a> to determine how you should install Node. On that note, there&#39;s a possibility that you may already have Node installed on your machine (e.g., if you&#39;re using a VPS). You can check the installed version by running the <code>node -v</code> command. If it outputs something like <code>v16.6.0</code> or higher, then you&#39;re good to go! Otherwise, take a look at <a href="https://nodejs.org/en/download/package-manager/" target="_blank" rel="noreferrer">this page</a> for instructions on installing Node on your OS.</p><hr><h2 id="preparing-the-essentials" tabindex="-1">Preparing the essentials <a class="header-anchor" href="#preparing-the-essentials" aria-hidden="true">#</a></h2><p>To use sheweny, you&#39;ll need to install it via npm (Node&#39;s package manager). npm comes with every Node installation, so you don&#39;t have to worry about installing that. However, before you install anything, you should set up a new project folder.</p><h3 id="setting-up-a-project-folder" tabindex="-1">Setting up a project folder <a class="header-anchor" href="#setting-up-a-project-folder" aria-hidden="true">#</a></h3><p>Like any other project, you should have a dedicated folder to keep it organized and manageable.</p><p>Navigate to a place on your machine that&#39;s easy to find and reopen in the future for convenience purposes. Create a new folder like you normally would (depending on your OS, you can use <code>mkdir project-name</code> inside your terminal). If you already have a name you want to use for your bot, you can use that as the folder name. Otherwise, you may name it something like <code>discord-bot</code> for the time being (or anything else you have in mind).</p><p>Once you&#39;re done making the folder, open it up (depending on your OS, you can use <code>cd project-name</code> inside your terminal).</p><h3 id="opening-the-command-prompt" tabindex="-1">Opening the command prompt <a class="header-anchor" href="#opening-the-command-prompt" aria-hidden="true">#</a></h3><p>If you&#39;re on Linux, you can quickly open up the terminal with <code>Ctrl + Alt + T</code>.</p><p>If you&#39;re on Windows and aren&#39;t familiar with opening up the command prompt, do the following:</p><ol><li>Open your bot project folder.</li><li>Hold down the <code>Shift</code> key and right-click inside the folder.</li><li>Choose the &quot;Open command window here&quot; option.</li></ol><p>It should then open up a window with a black background. It&#39;s a bit unattractive, but we&#39;ll talk about using better, more powerful tools in a different part of the guide.</p><h3 id="using-the-command-prompt" tabindex="-1">Using the command prompt <a class="header-anchor" href="#using-the-command-prompt" aria-hidden="true">#</a></h3><p>With the command prompt open, run the <code>node -v</code> command to make sure you&#39;ve successfully installed Node.js. If you see something like <code>v16.6</code> or higher, great! If not, go back and try installing again.</p><p>The next command you&#39;ll be running is <code>npm init</code>. This command creates a <code>package.json</code> file for you, which will keep track of the dependencies your bot uses and other info. If you&#39;re a bit confused by that, you can ignore it for the time being.</p><p>The <code>npm init</code> command will ask you a sequence of questions–you should fill them out as you see fit. If you&#39;re not sure of something or want to skip it as a whole, leave it blank and press enter.</p><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>Want to get started quickly? Use <code>npm init -y</code> to have it fill out everything for you!</p></div><p>Once you&#39;re done with that, you&#39;re ready to install sheweny!</p><hr><h2 id="installing-sheweny" tabindex="-1">Installing sheweny <a class="header-anchor" href="#installing-sheweny" aria-hidden="true">#</a></h2><p>Now that you&#39;ve installed Node.js and know how to open up your console and run commands, you can finally install sheweny!</p><p>To install sheweny, run the <code>npm install sheweny</code>. This can take a bit of time but should finish fairly quickly.</p><p>And that&#39;s it! With all the necessities installed, you&#39;re almost ready to start coding your bot.</p>',33),l=[i];function r(s,d,h,c,p,u){return t(),n("div",null,l)}const y=e(a,[["render",r]]);export{m as __pageData,y as default};
