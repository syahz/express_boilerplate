"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const web_1 = require("./application/web");
(0, dotenv_1.config)();
const PORT = process.env.PORT || 4000;
web_1.web.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
