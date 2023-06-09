import { UserRole } from '../types/role';

export default {
  unauthorized: 'User is not authorized',
  destroyedToken: 'Token has destroyed',
  wrongPassword: 'Wrong password',
  paymentCardAddSuccessful: 'payment card add successfull',
  paymentCardRemoveSuccessful: 'payment card remove successful',
  paymentCardNotFound: 'payment card not found',
  passwordUpdateSuccessful: 'password has updated successfull',
  avatarDidNotUpdate: 'avatar did not update',
  avatarUpdateSuccessful: 'avatar update successfull',
  userInfoDidNotUpdate: 'info did not update',
  userInfoUpdateSuccessful: 'info update successfull',
  certificateDidNotUpload: 'certificate did not upload',
  certificateUploadSuccessful: 'certificate upload successful',
  certificateRemoveSuccessful: 'certificate remove successful',
};

export function userWithEmailExist(userRole: UserRole | string, email: string) {
  return `${userRole} with email - ${email} alreary exist!`;
}

export function userWithEmailNotFound(userRole: string, email: string) {
  return `${userRole} with email - ${email} not found!`;
}

export function userWithIdNotFound(userRole: string, id: string) {
  return `${userRole} with id - ${id} not found!`;
}
