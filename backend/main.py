import logging
import os

import uvicorn

if __name__ == "__main__":
    # setup logs
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(message)s",
        datefmt="%Y %b %d, %H:%M",
        handlers=[
            logging.FileHandler("events.log"),
        ],
    )

    # run api server
    config = uvicorn.Config(
        "app:app",
        host=os.getenv("HOST", default="0.0.0.0"),
        port=int(os.getenv("PORT", default="8000")),
        log_level="info",
    )
    server = uvicorn.Server(config)
    server.run()
