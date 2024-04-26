"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use('/todos', todoRoutes_1.default);
exports.default = app;
const PORT = 3006;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
