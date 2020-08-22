import * as fs from "fs";
import { Logger } from "./Logger";

class Io {
    /**
     * @param {string} filePath the path to the file you want to check the existence of
     * {@link https://nodejs.org/api/fs.html#fs_file_access_constants Node File Access Constants}
     * @returns {boolean} if the file exists
     * @throws {Error} if we cannot either read, write or execute the file
     */
    fileExists(filePath : string) : boolean {
        let fileExists : boolean = false;
        fs.access(filePath, fs.constants.F_OK, (err) => {
            fileExists = !err;
        });
        return fileExists;
    }


}

Object.freeze(Io);

module.exports = new Io();