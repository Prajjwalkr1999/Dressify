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
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.ktx.Firebase

class User_Page : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_user__page)


        val actionBar = supportActionBar
        actionBar?.title = "\uD835\uDCD3\uD835\uDCFB\uD835\uDCEE\uD835\uDCFC\uD835\uDCFC\uD835\uDCF2\uD835\uDCEF\uD835\uDD02"


        val ref = FirebaseAuth.getInstance().currentUser?.email
        Log.i("main",ref.toString())


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
        }
        return super.onOptionsItemSelected(item)
    }
}