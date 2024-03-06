import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import {
  FirebaseStorage,
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
@Injectable()
export class MediaService {
  private readonly app: FirebaseApp;
  private readonly storage: FirebaseStorage;
  constructor(private readonly configService: ConfigService) {
    // const firebaseConfig = {
    //   apiKey: this.configService.get<string>('API_KEY'),
    //   authDomain: this.configService.get<string>('AUTH_DOMAIN'),
    //   projectId: this.configService.get<string>('PROJECT_ID'),
    //   storageBucket: this.configService.get<string>('STORAGE_BUCKET'),
    //   messagingSenderId: this.configService.get<string>('MESSAGING_SENDER_ID'),
    //   appId: this.configService.get<string>('APP_ID'),
    // };
    // console.log(firebaseConfig);
    const firebaseConfig = {
      apiKey: 'AIzaSyApMzch1qH1ZUHpqa48PObMjUz2d4QNgno',
      authDomain: 'krystal-fb0e3.firebaseapp.com',
      projectId: 'krystal-fb0e3',
      storageBucket: 'krystal-fb0e3.appspot.com',
      messagingSenderId: '491496674855',
      appId: '1:491496674855:web:7c0923f2d894c52d312002',
    };
    this.app = initializeApp(firebaseConfig);
    this.storage = getStorage(this.app);
  }

  public async upload(file: Express.Multer.File) {
    const storageRef = ref(
      this.storage,
      `krystal/${file.originalname}_${new Date().toISOString()}`,
    );
    const metadata = {
      contentType: file.mimetype,
    };
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata,
    );
    const downloadURL = await getDownloadURL(snapshot.ref);
    //console.log('File successfully uploaded: ', downloadURL);
    return downloadURL;
  }

  public async uploadFiles(files: Express.Multer.File[]) {
    const uploadPromises: Promise<string>[] = [];

    for (const file of files) {
      const uploadPromise = this.upload(file);
      uploadPromises.push(uploadPromise);
    }

    const downloadURLs = await Promise.all(uploadPromises);
    console.log('Files successfully uploaded: ', downloadURLs);
    return downloadURLs;
  }
}
