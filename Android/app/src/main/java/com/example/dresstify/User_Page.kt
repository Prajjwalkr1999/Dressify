package com.example.dresstify

import android.content.Intent
import android.os.Bundle
import android.util.Log
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.FragmentActivity
import androidx.recyclerview.widget.RecyclerView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.FirebaseDatabase
import com.google.firebase.firestore.FirebaseFirestore
import com.squareup.picasso.Picasso
import com.xwray.groupie.GroupAdapter
import com.xwray.groupie.GroupieViewHolder
import com.xwray.groupie.Item


class User_Page : AppCompatActivity() {


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_user__page)


        val actionBar = supportActionBar
        actionBar?.title = "\uD835\uDE0B\uD835\uDE19\uD835\uDE0C\uD835\uDE1A\uD835\uDE1A\uD835\uDE10\uD835\uDE0D\uD835\uDE20"

        val database = FirebaseDatabase.getInstance()
        val myRef = database.getReference("users")

        val db = FirebaseFirestore.getInstance()


        val adapter = GroupAdapter<GroupieViewHolder>()

        val recylerview_id :RecyclerView = findViewById(R.id.recycler_view_for_user)
        recylerview_id.adapter = adapter



        db.collection("suggestions")
                .get()
                .addOnCompleteListener { task ->
                    if (task.isSuccessful) {
                        for (document in task.result!!) {
                            Log.i("user_page", document.id + " => " + document.data)

                            adapter.add(dress_item(document.data.get("celeb") as String,
                                document.data.get("image-url") as String))

//                            adapter.add(dress_item("abc",""))
                        }
                    } else {
                        Log.i("user_page", "Error getting documents.", task.exception)
                    }
                }

//        if(!Python.isStarted()) {
//            Python.start(AndroidPlatform(this))
//        }



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
                val intent = Intent(this, Profile::class.java)
                startActivity(intent)
            }
            R.id.sign_out_id -> {
                FirebaseAuth.getInstance().signOut()

                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
            }

            R.id.navbar_profile -> {
                val intent = Intent(this, Profile::class.java)
                startActivity(intent)
            }

            R.id.navbar_signout -> {
                FirebaseAuth.getInstance().signOut()

                val intent = Intent(this, MainActivity::class.java)
                startActivity(intent)
            }
        }
        return super.onOptionsItemSelected(item)
    }


}

class dress_item(val name:String, val image_url:String) :Item<GroupieViewHolder>(){

    override fun bind(viewHolder: GroupieViewHolder, position: Int) {
        val celeb_name:TextView = viewHolder.itemView.findViewById(R.id.celeb_name_id)
        val celeb_image:ImageView = viewHolder.itemView.findViewById(R.id.celeb_image_id)

        celeb_name.text = name
        Picasso.get().load(image_url).into(celeb_image)
    }

    override fun getLayout(): Int {
        return R.layout.dresses_collection
    }

}