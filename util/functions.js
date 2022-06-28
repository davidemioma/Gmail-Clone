import { addDoc, collection, deleteDoc, doc } from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { db, storage } from "../firebase";

export const createMail = async (data, selectedFiles, setSelectedFiles) => {
  const docRef = await addDoc(collection(db, "emails"), data);

  if (selectedFiles.length > 0) {
    const emailRef = ref(storage, `emails/${docRef?.id}/files`);

    selectedFiles.map(async (file) => {
      await uploadString(emailRef, file.dataUrl, "data_url").then(
        async (snapshot) => {
          const downloadUrl = await getDownloadURL(emailRef);

          await addDoc(collection(db, "emails", docRef.id, "files"), {
            file: downloadUrl,
            name: file.name,
            size: file.size,
          });

          setSelectedFiles([]);
        }
      );
    });
  }
};

export const createReply = async (
  id,
  data,
  selectedFiles,
  setSelectedFiles
) => {
  const docRef = await addDoc(collection(db, "emails", id, "replies"), data);

  if (selectedFiles.length > 0) {
    const emailRef = ref(storage, `emails/${docRef?.id}/replies/files`);

    selectedFiles.map(async (file) => {
      await uploadString(emailRef, file.dataUrl, "data_url").then(
        async (snapshot) => {
          const downloadUrl = await getDownloadURL(emailRef);

          await addDoc(
            collection(db, "emails", id, "replies", docRef.id, "files"),
            {
              file: downloadUrl,
              name: file.name,
              size: file.size,
            }
          );

          setSelectedFiles([]);
        }
      );
    });
  }
};

export const deleteMail = async (id, files) => {
  files?.map(
    async (file) => await deleteDoc(doc(db, "emails", id, "files", file.id))
  );

  await deleteDoc(doc(db, "emails", id));
};
