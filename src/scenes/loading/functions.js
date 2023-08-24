import { storage } from "../../utils/storage";
import uuid from 'react-native-uuid';
import { storageKey } from "../../config";

const loadUser = async() => {
  try {
    const res = await storage.load({key: storageKey.user})
    return res
  } catch(e) {
    console.log('user data empty')
    const res = await createUser()
    return res
  }
}

const createUser = async() => {
  const result = uuid.v4()
  await storage.save({key: storageKey.user, data: result})
  return result
}

const removeData = async() => {
  await storage.remove({key: storageKey.code})
}

export { loadUser, removeData }