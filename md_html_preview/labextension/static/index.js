import { ToolbarButton } from '@jupyterlab/apputils';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';
import { ISettingRegistry } from '@jupyterlab/settingregistry';

const PLUGIN_ID = 'md_html_preview';

const plugin = {
  id: PLUGIN_ID,
  autoStart: true,
  requires: [IFileBrowserFactory, ISettingRegistry],
  activate: async (app, browserFactory, settings) => {
    const { commands, serviceManager } = app;
    let cssPath = '';
    try {
      const loaded = await settings.load(PLUGIN_ID);
      const update = () => {
        cssPath = loaded.get('defaultCSS').composite || '';
      };
      loaded.changed.connect(update);
      update();
    } catch (err) {
      console.error('Failed to load settings for md_html_preview', err);
    }

    const command = 'md-html-preview:convert';
    commands.addCommand(command, {
      label: 'Render Markdown to HTML',
      execute: async () => {
        const widget = browserFactory.tracker.currentWidget;
        if (!widget) {
          return;
        }
        const context = widget.context;
        const path = context.path;
        const response = await serviceManager.serverSettings.fetch('/md-preview', {
          method: 'POST',
          body: JSON.stringify({ path, css: cssPath })
        });
        const data = await response.json();
        if (data && data.html) {
          await commands.execute('docmanager:open', { path: data.html });
        }
      }
    });

    const button = new ToolbarButton({
      iconClass: 'jp-MarkdownIcon',
      onClick: () => { commands.execute(command); },
      tooltip: 'Render Markdown to HTML'
    });
    browserFactory.defaultBrowser.toolbar.addItem('md-html-preview', button);
  }
};

export default plugin;
