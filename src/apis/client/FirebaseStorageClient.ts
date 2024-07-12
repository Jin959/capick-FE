import {FirebaseApp, initializeApp} from "firebase/app";
import {FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {FirebaseOptions} from "@firebase/app";
import {v4 as uuid} from "uuid";

class FirebaseStorageClient {

  private constructor(
    private readonly firebaseApp: FirebaseApp,
    private readonly storage: FirebaseStorage
  ) {}

  public static of = (firebaseConfig: FirebaseOptions): FirebaseStorageClient => {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    return new FirebaseStorageClient(app, storage);
  }

  public create = async (file: File, path: string, fileType: "images" | "videos", fileName?: string): Promise<string> => {
    let fileNameWithUuid;
    if (!fileName) {
      fileNameWithUuid = uuid();
    } else {
      fileNameWithUuid = `${fileName}_${uuid()}`;
    }

    const storageRef = ref(this.storage, `${fileType}/${path}/${fileNameWithUuid}`);

    return uploadBytes(storageRef, file)
      .then(snapshot => getDownloadURL(snapshot.ref));
  }

}

export default FirebaseStorageClient;