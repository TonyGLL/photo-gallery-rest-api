import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs-extra';

import Photo from '../models/Photo';

// Get all Photos from the Database
export async function getPhotos(req: Request, res: Response): Promise<Response> {

    const photos = await Photo.find();
    return res.json(photos);
}

// Get one Photo By Id from the Database
export async function getPhoto(req: Request, res: Response): Promise<Response> {

    const id = req.params.id;
    const photo = await Photo.findById(id);

    return res.json(photo);
}

// Save Photo into the Database
export async function createPhoto(req: Request, res: Response): Promise<Response> {

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

    const photo = new Photo(newPhoto);
    // console.log(photo);

    await photo.save();

    return res.json({

        ok: true,
        Photo: photo,
        message: 'Photo saved successfully'
    });
}

// Delete one Photo By Id from the Database
export async function deletePhoto(req: Request, res: Response): Promise<Response> {

    const id = req.params.id;
    const photo = await Photo.findByIdAndRemove(id);

    if (photo) {

        await fs.unlink(path.resolve(photo.imagePath));
    }

    return res.json({

        ok: true,
        Photo: photo,
        message: 'Photo Deleted'
    });
}

// Update one Photo By Id from the Database
export async function updatePhoto(req: Request, res: Response): Promise<Response> {

    const id = req.params.id;
    const { title , description} = req.body;
    const updatedPhoto = await Photo.findByIdAndUpdate(id, {

        title,
        description
    }, { new: true });

    return res.json({

        ok: true,
        UpdatedPhoto: updatedPhoto,
        message: 'Photo Updated'
    });
}