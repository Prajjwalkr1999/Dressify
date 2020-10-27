package com.example.dresstify

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.Menu
import android.view.MenuInflater
import android.view.MenuItem
import android.view.View
import android.widget.Toolbar
import androidx.appcompat.app.ActionBarDrawerToggle
import androidx.drawerlayout.widget.DrawerLayout

class User_Page : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_user__page)

//        val toolbar :Toolbar
//
//        val drawer: DrawerLayout = findViewById(R.id.drawer_layout)
//        val toggle: ActionBarDrawerToggle = ActionBarDrawerToggle(this,drawer,R.string.nav_open,R.string.nav_close)
//        drawer.addDrawerListener(toggle)
//        toggle.setDrawerIndicatorEnabled(true)
//

//        setSupportActionBar(Toolbar)
        val actionBar = supportActionBar
        actionBar?.title = "Hello Toolbar"


        // Initialize the action bar drawer toggle instance
//        val drawerToggle:ActionBarDrawerToggle = object : ActionBarDrawerToggle(
//            this,
//            drawer_layout,
//            toolbar,
//            R.string.drawer_open,
//            R.string.drawer_close
//        ){
//            override fun onDrawerClosed(view: View){
//                super.onDrawerClosed(view)
//                //toast("Drawer closed")
//            }
//
//            override fun onDrawerOpened(drawerView: View){
//                super.onDrawerOpened(drawerView)
//                //toast("Drawer opened")
//            }
//        }

//
//        // Configure the drawer layout to add listener and show icon on toolbar
//        drawerToggle.isDrawerIndicatorEnabled = true
//        drawer_layout.addDrawerListener(drawerToggle)
//        drawerToggle.syncState()




    }

    override fun onCreateOptionsMenu(menu: Menu): Boolean {
        val inflater: MenuInflater = menuInflater
        inflater.inflate(R.menu.menu_for_userpage, menu)
        return true
    }


    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        return super.onOptionsItemSelected(item)
    }
}