import {FirebaseApp, initializeApp} from "firebase/app";
import {FirebaseStorage, getDownloadURL, getStorage, ref, uploadBytes} from "firebase/storage";
import {FirebaseOptions} from "@firebase/app";
import {v4 as uuid} from "uuid";
import StorageResponse from "@/apis/dto/client/response/StorageResponse";
import StorageClient from "@/apis/client/StorageClient";
import StorageCreateRequest from "@/apis/dto/client/request/StorageCreateRequest";

class FirebaseStorageClient implements StorageClient {

  private constructor(
    private readonly firebaseApp: FirebaseApp,
    private readonly storage: FirebaseStorage
  ) {}

  public static of = (firebaseConfig: FirebaseOptions): FirebaseStorageClient => {
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    return new FirebaseStorageClient(app, storage);
  }

  public create = async (storageCreateRequest: StorageCreateRequest): Promise<StorageResponse> => {
    let fileNameWithUuid = "";
    if (!storageCreateRequest.fileName) {
      fileNameWithUuid = uuid();
    } else {
      fileNameWithUuid = `${storageCreateRequest.fileName}_${uuid()}`;
    }

    const storageRef = ref(this.storage,
      `${storageCreateRequest.fileType}/${storageCreateRequest.path}/${fileNameWithUuid}`
    );
    const downloadUrl = await uploadBytes(storageRef, storageCreateRequest.file)
      .then(snapshot => getDownloadURL(snapshot.ref));

    return {
      name: fileNameWithUuid,
      url: downloadUrl
    }
  }

}

export default FirebaseStorageClient;