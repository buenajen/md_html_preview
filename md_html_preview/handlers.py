from tornado import web
from jupyter_server.base.handlers import APIHandler
import pypandoc, pathlib, json

class ConvertHandler(APIHandler):
    @web.authenticated
    def post(self):
        data = self.get_json_body() or {}
        md_path = pathlib.Path(data["path"]).resolve()
        css = pathlib.Path(
            data.get("css") or md_path.with_name("style.css")
        )
        extra = ["-s", f"--css={css}", "--self-contained"]
        html_path = md_path.with_suffix(".html")
        pypandoc.convert_file(md_path, "html5", outputfile=html_path, extra_args=extra)
        self.finish({"html": html_path.name})