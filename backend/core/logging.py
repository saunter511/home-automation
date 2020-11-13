from datetime import datetime
from logging import Formatter


class ColoredFormatter(Formatter):
    colors = {
        # levels
        "debug": 57,  # pink
        "info": 39,  # light blue
        "warning": 208,  # orange
        "error": 196,  # red
        # elements
        "name": 247,  # light gray
        "default": 37,  # white
        "time": 242,  # gray
    }

    levelColors = {
        "CRITICAL": "error",  # 50
        "ERROR": "error",  # 40
        "WARNING": "warning",  # 30
        "INFO": "info",  # 20
        "DEBUG": "debug",  # 10
    }

    logTemplate = "{time} {level} {name}  {message}"

    def colored(self, text: str, color: str):
        if color not in self.colors:
            raise Exception(f"{color} is not a color")

        return f"\033[38;5;{self.colors[color]}m{text}\033[0m"

    def format(self, record):
        level = self.colored(record.levelname, self.levelColors.get(record.levelname, "default"))
        time = self.colored(
            datetime.fromtimestamp(record.created).strftime("%Y-%m-%d %H:%M:%S"),
            "time",
        )
        name = self.colored(record.name, "name")
        message = record.getMessage()

        return self.logTemplate.format(level=level, time=time, name=name, message=message)
