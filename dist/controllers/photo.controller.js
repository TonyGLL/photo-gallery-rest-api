"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePhoto = exports.deletePhoto = exports.createPhoto = exports.getPhoto = exports.getPhotos = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const Photo_1 = __importDefault(require("../models/Photo"));
// Get all Photos from the Database
async function getPhotos(req, res) {
    const photos = await Photo_1.default.find();
    return res.json(photos);
}
exports.getPhotos = getPhotos;
// Get one Photo By Id from the Database
async function getPhoto(req, res) {
    const id = req.params.id;
    const photo = await Photo_1.default.findById(id);
    return res.json(photo);
}
exports.getPhoto = getPhoto;
// Save Photo into the Database
async function createPhoto(req, res) {
    // console.log('Saving Photo');
    // console.log(req.body);
    const { title, description } = req.body;
    const filePath = req.file.path;
    // console.log(filePath);
    const newPhoto = {
        title: title,
        description: description,
        imagePath: filePath
    };
    const photo = new Photo_1.default(newPhoto);
    // console.log(photo);
    await photo.save();
    return res.json({
        ok: true,
        Photo: photo,
        message: 'Photo saved successfully'
    });
}
exports.createPhoto = createPhoto;
// Delete one Photo By Id from the Database
async function deletePhoto(req, res) {
    const id = req.params.id;
    const photo = await Photo_1.default.findByIdAndRemove(id);
    if (photo) {
        await fs_extra_1.default.unlink(path_1.default.resolve(photo.imagePath));
    }
    return res.json({
        ok: true,
        Photo: photo,
        message: 'Photo Deleted'
    });
}
exports.deletePhoto = deletePhoto;
// Update one Photo By Id from the Database
async function updatePhoto(req, res) {
    const id = req.params.id;
    const { title, description } = req.body;
    const updatedPhoto = await Photo_1.default.findByIdAndUpdate(id, {
        title,
        description
    }, { new: true });
    return res.json({
        ok: true,
        UpdatedPhoto: updatedPhoto,
        message: 'Photo Updated'
    });
}
exports.updatePhoto = updatePhoto;
