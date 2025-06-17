import {FeedFile} from "./file/FeedFile";

export type FeedConfig = {
  [fileExtension: string]: FeedFile
}; 