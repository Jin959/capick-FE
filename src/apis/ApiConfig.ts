import AxiosClient from "@/apis/client/AxiosClient";
import ApiClient from "@/apis/client/ApiClient";
import StorageClient from "@/apis/client/StorageClient";
import FirebaseStorageClient from "@/apis/client/FirebaseStorageClient";

class ApiConfig {

  public static apiClientForClientSide(): ApiClient {
    return AxiosClient.of(process.env.NEXT_PUBLIC_CAPICK_API_URL, 3000);
  }

  public static apiClientForServerSide(): ApiClient {
    return AxiosClient.of(
      `${process.env.NEXT_PUBLIC_APP_DOMAIN}${process.env.NEXT_PUBLIC_CAPICK_API_URL}`, 3000);
  }

  public static storageClient(): StorageClient {
    return FirebaseStorageClient.of({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
    });
  }

}

export default ApiConfig;
