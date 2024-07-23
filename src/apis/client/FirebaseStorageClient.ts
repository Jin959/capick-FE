import {FirebaseApp, initializeApp} from "firebase/app";
import {deleteObject, FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {FirebaseOptions} from "@firebase/app";
import {v4 as uuid} from "uuid";
import {FileNameWithUrl} from "@/types/common";

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

  public create = async (file: File, path: string, fileType: "images" | "videos", fileName?: string): Promise<FileNameWithUrl> => {
    let fileNameWithUuid = "";
    if (!fileName) {
      fileNameWithUuid = uuid();
    } else {
      fileNameWithUuid = `${fileName}_${uuid()}`;
    }

    const storageRef = ref(this.storage, `${fileType}/${path}/${fileNameWithUuid}`);
    const downloadUrl = await uploadBytes(storageRef, file)
      .then(snapshot => getDownloadURL(snapshot.ref));

    return {
      name: fileNameWithUuid,
      url: downloadUrl
    }
  }

  public delete = async (fileName: string, path: string, fileType: "images" | "videos"): Promise<void> => {
    await deleteObject(ref(this.storage, `${fileType}/${path}/${fileName}`));
  }

}

export default FirebaseStorageClient;