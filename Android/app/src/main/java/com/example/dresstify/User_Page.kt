package com.example.dresstify

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import android.widget.Toolbar
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.drawerlayout.widget.DrawerLayout
import com.chaquo.python.PyObject
import com.chaquo.python.Python
import com.chaquo.python.android.AndroidPlatform
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.DataSnapshot
import com.google.firebase.database.DatabaseError
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.database.ValueEventListener
import com.google.firebase.ktx.Firebase
import com.squareup.picasso.Picasso

class User_Page : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_user__page)


        val actionBar = supportActionBar
        actionBar?.title = "\uD835\uDE0B\uD835\uDE19\uD835\uDE0C\uD835\uDE1A\uD835\uDE1A\uD835\uDE10\uD835\uDE0D\uD835\uDE20"

        val database = FirebaseDatabase.getInstance()
        val myRef = database.getReference("users")

        if(!Python.isStarted()) {
            Python.start(AndroidPlatform(this))
        }



//        val ref = FirebaseAuth.getInstance().currentUser?.email
//        val email_id: String? = ref
//
//        Log.i("user_page",ref.toString())
//
//        myRef.addValueEventListener(object : ValueEventListener {
//            override fun onDataChange(snapshot: DataSnapshot) {
//
//                for(data in snapshot.children){
//
//                    Log.i("user_page","$data")
//                    val user_data = data.getValue(user::class.java)
//
//                    if(user_data?.email_id==email_id){
//
//                        val py:Python = Python.getInstance()
//                        val pyobj: PyObject = py.getModule("faces_image")
//                        val profile_url = user_data?.profileimageurl
//                        val obj: PyObject ?= pyobj.callAttr("fun",profile_url)
//
//                        Log.i("user_page",obj.toString())
//                    }
//
//
//                }
//            }
//
//            override fun onCancelled(error: DatabaseError) {
//                // Failed to read value
////                Log.w(, "Failed to read value.", error.toException())
//            }
//        })





    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        val inflater: MenuInflater = menuInflater
        inflater.inflate(R.menu.menu_for_userpage, menu)
        return true
    }


    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        when(item.itemId){
            R.id.profile_menu -> {
                val intent = Intent(this,Profile::class.java)
                startActivity(intent)
            }
            R.id.sign_out_id -> {
                FirebaseAuth.getInstance().signOut()

                val intent = Intent(this,MainActivity::class.java)
                startActivity(intent)
            }

            R.id.navbar_profile -> {
                val intent = Intent(this,Profile::class.java)
                startActivity(intent)
            }

            R.id.navbar_signout -> {
                FirebaseAuth.getInstance().signOut()

                val intent = Intent(this,MainActivity::class.java)
                startActivity(intent)
            }
        }
        return super.onOptionsItemSelected(item)
    }


}