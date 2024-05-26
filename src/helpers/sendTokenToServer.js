export const sendTokenToServer = async (userId, token) => {
    try {
      await firestore.collection('users').doc(userId).set({
        fcmTokens: firebase.firestore.FieldValue.arrayUnion({
          token,
          updatedAt: new Date(),
        }),
      }, { merge: true });
      console.log('Token successfully sent to server');
    } catch (error) {
      console.error('Error sending token to server:', error);
    }
  };
