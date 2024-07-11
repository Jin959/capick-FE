import {FirebaseApp, initializeApp} from "firebase/app";
import {FirebaseStorage, getStorage, ref} from "firebase/storage";
import {FirebaseOptions} from "@firebase/app";

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

}

export default FirebaseStorageClient;