from tornado import web
from jupyter_server.base.handlers import APIHandler
import pathlib
<<<<<<< ours
import pypandoc
=======

try:
    import pypandoc
except Exception:  # pragma: no cover - handle optional dependency
    pypandoc = None
>>>>>>> theirs


class ConvertHandler(APIHandler):
    @web.authenticated
    def post(self):
        data = self.get_json_body() or {}
        md_path = pathlib.Path(data["path"]).resolve()
        css = pathlib.Path(data.get("css") or md_path.with_name("style.css")).resolve()
        extra = ["-s", f"--css={css}", "--self-contained"]
        html_path = md_path.with_suffix(".html")
        if pypandoc is None:
            raise web.HTTPError(500, "pypandoc is not installed")
        pypandoc.convert_file(md_path, "html5", outputfile=html_path, extra_args=extra)
        base_dir = pathlib.Path(self.contents_manager.root_dir).resolve()
        rel_html = html_path.resolve().relative_to(base_dir).as_posix()
        self.finish({"html": rel_html})
