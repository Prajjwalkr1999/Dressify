package com.example.dresstify

import android.os.Bundle
import android.util.Log
import android.widget.EditText
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.FragmentActivity
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.squareup.picasso.Picasso


class Profile : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val actionBar = supportActionBar
        actionBar?.title = "My Profile"

        supportActionBar?.setDisplayHomeAsUpEnabled(true)


        val database = FirebaseDatabase.getInstance()
        val myRef = database.getReference("users")

        val ref = FirebaseAuth.getInstance().currentUser?.email
        val email_id: String? = ref

        val username_profile: TextView = findViewById(R.id.profile_user)
        val image_id:ImageView = findViewById(R.id.profile_image_id)

        val username_profile1: TextView = findViewById((R.id.profile_username))
        val email_profile: TextView = findViewById(R.id.profile_emailid)
        val phoneno: TextView = findViewById(R.id.profile_phoneno_id)


        myRef.addValueEventListener(object : ValueEventListener {
            override fun onDataChange(snapshot: DataSnapshot) {

                for(data in snapshot.children){

                    Log.i("profile","$data")
                    val user_data = data.getValue(user::class.java)

                    if(user_data?.email_id==email_id){
                        Log.i("profile","user id matched!!")
                        username_profile.text = user_data?.username
                        username_profile1.text = user_data?.username
                        email_profile.text = user_data?.email_id
                        phoneno.text = user_data?.phoneno


                        Picasso.get().load(user_data?.profileimageurl).into(image_id)
                    }


                }
            }

            override fun onCancelled(error: DatabaseError) {
                // Failed to read value
//                Log.w(, "Failed to read value.", error.toException())
            }
        })
    }
}