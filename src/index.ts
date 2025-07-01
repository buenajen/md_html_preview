import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { ICommandPalette, ToolbarButton } from '@jupyterlab/apputils';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { IFileBrowserFactory } from '@jupyterlab/filebrowser';

const PLUGIN_ID = 'jupyterlab-md-preview';

const plugin: JupyterFrontEndPlugin<void> = {
  id: PLUGIN_ID,
  autoStart: true,
  requires: [ICommandPalette, IFileBrowserFactory],
  activate(app, palette, browserFactory) {
    const { commands } = app;

    const cmd = 'markdown:render-html';
    commands.addCommand(cmd, {
      label: 'Render Markdown to HTML',
      execute: async () => {
        const widget = browserFactory.tracker.currentWidget;
        if (!widget) { return; }
        const context = (widget as any).context as DocumentRegistry.Context;
        const path = context.path;
        await app.serviceManager.serverSettings.fetch('/md-preview', {
          method: 'POST',
          body: JSON.stringify({ path })
        });
      }
    });

    // Кнопка в toolbar файлового браузера
    const button = new ToolbarButton({
      iconClass: 'jp-MaterialIcon jp-MarkdownIcon',
      onClick: () => { commands.execute(cmd); },
      tooltip: 'Render Markdown to HTML'
    });
    browserFactory.defaultBrowser.toolbar.addItem('md-render', button);
  }
};

export default plugin;