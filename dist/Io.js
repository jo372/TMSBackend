"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
class Io {
    /**
     * @param {string} filePath the path to the file you want to check the existence of
     * {@link https://nodejs.org/api/fs.html#fs_file_access_constants Node File Access Constants}
     * @returns {boolean} if the file exists
     * @throws {Error} if we cannot either read, write or execute the file
     */
    fileExists(filePath) {
        let fileExists = false;
        fs.access(filePath, fs.constants.F_OK, (err) => {
            fileExists = !err;
        });
        return fileExists;
    }
}
Object.freeze(Io);
module.exports = new Io();
