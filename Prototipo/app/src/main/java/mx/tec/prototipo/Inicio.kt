package mx.tec.prototipo

import android.Manifest
import android.content.Context
import android.content.Intent
import android.content.pm.PackageManager
import android.location.Location
import android.location.LocationListener
import android.location.LocationManager
import android.net.Uri
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.MediaController
import android.widget.Toast
import android.widget.VideoView
import androidx.activity.result.contract.ActivityResultContracts
import androidx.core.app.ActivityCompat
import androidx.viewpager.widget.ViewPager
import androidx.viewpager2.widget.ViewPager2

class Inicio : AppCompatActivity(){

    lateinit var locationManager: LocationManager
    lateinit var ontouchelistener : View.OnTouchListener

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_inicio)

        val offlineUri = Uri.parse("android.resource://$packageName/${R.raw.bancovid}")

        val btnLogin = findViewById<Button>(R.id.btn_Inicio_Login)
        val btnCreate = findViewById<Button>(R.id.btn_Inicio_Crear_Cuenta)

        val sharedPreferences = getSharedPreferences("profile",Context.MODE_PRIVATE)

        if(sharedPreferences.contains("idUser") && sharedPreferences.contains("x-access-token")){
            Log.e("Exists", "enters")
            val intent = Intent(this@Inicio,BottomNavigation::class.java)
            startActivity(intent)

        }

        val requestPermission = registerForActivityResult(ActivityResultContracts.RequestPermission()){
            isGranted ->
            when {
            isGranted -> Log.e("GPS", "Permiso Concedido")

                Build.VERSION.SDK_INT >= Build.VERSION_CODES.M &&
                        shouldShowRequestPermissionRationale(android.Manifest.permission.ACCESS_FINE_LOCATION)->
                    Toast.makeText(this@Inicio, "Es necesario habilitar el GPS para guardar localizaciones", Toast.LENGTH_SHORT).show()
                else ->Toast.makeText(this@Inicio, "Permiso de GPS denegado", Toast.LENGTH_SHORT).show()

            }
        }

        requestPermission.launch(android.Manifest.permission.ACCESS_FINE_LOCATION)

        btnCreate.setOnClickListener{
            val intent = Intent(this@Inicio,Create::class.java)
            startActivity(intent)
        }
        btnLogin.setOnClickListener{
            val intent = Intent(this@Inicio,MainActivity::class.java)
            startActivity(intent)
        }
    }
}