package com.example.dresstify

import android.app.Activity
import android.content.Intent
import android.graphics.Bitmap
import android.graphics.drawable.BitmapDrawable
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.util.Log
import android.widget.*
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.auth.AuthResult
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.storage.FirebaseStorage
import com.google.firebase.storage.StorageReference
import java.util.*

val TAG_setupProfile: String = "setupprofile"


class SetUpProfile : AppCompatActivity() {

    private var mAuth: FirebaseAuth? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_set_up_profile)

        supportActionBar?.title = "Set up Profile"
        supportActionBar?.setDisplayHomeAsUpEnabled(true)

        mAuth = FirebaseAuth.getInstance()

        //for storage
        var storageRef = FirebaseStorage.getInstance().reference
        var imagesRef: StorageReference? = storageRef.child("images")


//        val onclick_photo: TextView = findViewById(R.id.cilck_a_photo_id)
        val onupload_photo: TextView = findViewById(R.id.upload_a_photo_id)

//        onclick_photo.setOnClickListener{
//            takePhoto()
//        }

        onupload_photo.setOnClickListener{
            selectImageInAlbum()
        }


        val profile_bttn :Button = findViewById(R.id.create_profile_bttn)
        profile_bttn.setOnClickListener{
            onSignup_newuser()
        }
    }




    private fun onSignup_newuser(){


        Log.i(TAG_setupProfile,"in on Signup_newuser()")
        val email_id: EditText = findViewById(R.id.person_email_id)
        val passsword_id: EditText = findViewById(R.id.person_password_id)

        val email: String = email_id.text.toString()
        val password:String = passsword_id.text.toString()

        if(email=="" || password==""){
            val toast:Toast = Toast.makeText(applicationContext,"Please enter correct credentials",Toast.LENGTH_SHORT)
            toast.show()
            return
        }

        Log.i(TAG_setupProfile,"email :$email ans password $password")

        mAuth!!.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(
                        this
                ) { task ->
                    if (task.isSuccessful) {
                        // Sign in success, update UI with the signed-in user's information
                        Log.i(TAG_setupProfile, "createUserWithEmail:success $email")
//                        val user = mAuth!!.currentUser
//                        updateUI(user)

                        uploadImagetoFirebase()
                        val user = mAuth!!.currentUser

                        val intent = Intent(this,User_Page::class.java)
                        startActivity(intent)

                    } else {
                        // If sign in fails, display a message to the user.
                        Log.i(TAG_setupProfile, "createUserWithEmail:failure", task.exception)
//                        Toast.makeText(
//                            this@EmailPasswordActivity, "Authentication failed.",
//                            Toast.LENGTH_SHORT
//                        ).show()
//                        updateUI(null)
                    }

                    // ...
                }
    }

    fun selectImageInAlbum() {
//        val intent = Intent(Intent.ACTION_GET_CONTENT)
//        intent.type = "image/*"
//        if (intent.resolveActivity(packageManager) != null) {
//            startActivityForResult(intent, 0)
//        }

        Toast.makeText(applicationContext, "You clicked image", Toast.LENGTH_SHORT).show()

        val intent = Intent(Intent.ACTION_PICK)
        intent.type = "image/*"
        startActivityForResult(intent, 0)
    }

//    fun takePhoto() {
//        val intent1 = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
//        if (intent1.resolveActivity(packageManager) != null) {
//            startActivityForResult(intent1, 1)
//        }
//    }

//    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
//        super.onActivityResult(requestCode, resultCode, data)
//
//        if (requestCode == 1 && resultCode == Activity.RESULT_OK) {
//            val bitmap: Bitmap = data?.extras?.get("data") as Bitmap
//            val image: ImageView = findViewById(R.id.profile_image)
//            image.setImageBitmap(bitmap)
//            Log.i(TAG, "image is taken")
//
//        }
//
//        if (requestCode == 0 && resultCode == Activity.RESULT_OK) {
////            imageView.setImageURI(null)
//            val image: ImageView = findViewById(R.id.profile_image)
//            image.setImageURI(data?.data)
//
//        }
//    }

    var selectedPhotoUri: Uri? = null

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)

        if(requestCode==0 && resultCode== Activity.RESULT_OK && data!= null){
            Log.i(TAG_setupProfile, "image is selected")
            selectedPhotoUri = data.data    // uri will store the location of the image
            val bitmap = MediaStore.Images.Media.getBitmap(contentResolver, selectedPhotoUri)

            val bitmapdrawable = BitmapDrawable(bitmap)

            val imageid:ImageView = findViewById(R.id.profile_image)

            imageid.setBackgroundDrawable(bitmapdrawable)
            Log.i(TAG_setupProfile, "Image is displayed with uri$selectedPhotoUri")
        }
    }

    private fun uploadImagetoFirebase(){

        if(selectedPhotoUri==null){
            Log.i(TAG_setupProfile,"Photouri is null")
            return
        }

        Log.i(TAG_setupProfile,"Uploading image..")
        val filename = UUID.randomUUID().toString()
        val ref = FirebaseStorage.getInstance().getReference("/images/$filename")

        ref.putFile(selectedPhotoUri!!)
                .addOnSuccessListener {
                    Log.i(TAG_setupProfile,"Successfully uploaded image to Firebase")

                    ref.downloadUrl
                            .addOnSuccessListener {
                                Log.i(TAG_setupProfile, "Image location:$it")

//                               saveUsertoFirebaseDatabase(it.toString())
                            }
                }
                .addOnFailureListener{
                    Log.i(TAG_setupProfile,"Image is not uploaded")
                }

    }


    //TODO: test push one
}