<template>
  <div>
    <h1>User Profile</h1>
    <v-card>
      <v-card-title>
        User Information
      </v-card-title>
      <v-card-subtitle>
        Please upload your profile picture
      </v-card-subtitle>
      <v-card-text>
        <p>Your Email: {{ userEmail }}</p>
        <p>Your Gender: {{ userGender }}</p>
        <input type="file" @change="onFileChange">
        <v-btn @click="uploadImage">Submit</v-btn>
        <img :src="profileImageUrl" alt="Profile Image">
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';
import {getDatabase, onValue, ref} from "firebase/database";
import { getAuth } from "firebase/auth";

export default {
  name: "ProfileComponent",
  data() {
    return {
      selectedFile: null,
      profileImageUrl: '',
      userEmail: '',
      userGender: '',
    };
  },
  created() {
    const user = getAuth().currentUser;
    const db = getDatabase();

      console.log("user: " + user);
    const userRef = ref(db, 'users/' + user.uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      console.log("data: " + data);
      if (data) {
         this.userEmail = data.email;
         this.userGender = data.gender;
      }
    });

  },
  methods: {
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
    },
    uploadImage() {
      if (!this.selectedFile) {
        alert('Please select an image!');
        return;
      }

      const storageRef = firebase.storage().ref();
      const uploadTask = storageRef.child('images/' + this.selectedFile.name).put(this.selectedFile);

      uploadTask.on('state_changed',
          snapshot => {
            // Compute the upload progress as a percentage and store it
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
          },
          error => {
            console.log(error);
          },
          () => {
            uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
              this.profileImageUrl = downloadURL;
            });
          }
      );
    },
  },
};
</script>
