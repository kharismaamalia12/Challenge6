const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./config") //import konfigurasi database

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

//end-point akses data siswa
app.get("/siswa", (req,res) => {
    //create sql query
    let sql = "select * from siswa"

    //run query
    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message //pesan error
            }
        }else{
            response = {
                count : result.length, //jumlah data
                siswa : result
            }
        }
        res.json(response) //send response
    })
})

//end-point akses data siswa berdasarkan id_siswa tertentu
app.get("/siswa/:id", (req,res) => {
    let data = {
        id_siswa : req.params.id
    }
    let sql = "select * from siswa where ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message 
            }
        }else{
            response = {
                count : result.length,
                siswa : result
            }
        }
        res.json(response)
    })
})

//MENAMBAHKAN DATA
app.post("/siswa", (req,res) => {
    let data = {
        nis : req.body.nis,
        nama_siswa  : req.body.nama_siswa,
        kelas : req.body.kelas
    }

    let sql = "insert into siswa set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }else{
            response = {
                message : result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

//MENGUBAH DATA
app.put("/siswa/:id", (req,res) => {
    let data = [
        //data
        {
            nis : req.body.nis,
            nama_siswa : req.body.nama_siswa,
            kelas : req.body.kelas
        },
        //parameter (primary key)
        {
            id_siswa : req.params.id
        }
    ]
    
    let sql = "update siswa set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }else{
            response = {
                message : result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

//MENGHAPUS DATA
app.delete("/siswa/:id", (req,res) => {
    //prepare data
    let data =
        //parameter (primary key)
        {
            id_siswa : req.params.id
        }
    

    let sql = "delete from siswa where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }else{
            response = {
                message : result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.get("/guru", (req,res) => {
    let sql = "select * from guru"

    db.query(sql, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }else{
            response = {
                count : result.length,
                guru : result
            }
        }
        res.json(response)
    })
})

app.get("/guru/:id", (req,res) => {
    let data = {
        id_guru : req.params.id
    }
    let sql = "select * from guru where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }else{
            response = {
                count : result.length,
                guru : result
            }
        }
        res.json(response)
    })
})

app.post("/guru", (req,res) => {
    let data = {
        nip : req.body.nip,
        nama_guru : req.body.nama_guru,
        tgl_lahir : req.body.tgl_lahir,
        alamat : req.body.alamat
    }

    let sql = "insert into guru set ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }else{
            response = {
                message : result.affectedRows + " data inserted"
            }
        }
        res.json(response)
    })
})

app.put("/guru/:id", (req,res) => {
    let data = [
        {
            nip : req.body.nip,
            nama_guru : req.body.nama_guru,
            tgl_lahir : req.body.tgl_lahir,
            alamat : req.body.alamat
        },
        {
            id_guru : req.params.id
        }
    ]

    let sql = "update guru set ? where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }else{
            response = {
                message : result.affectedRows + " data updates"
            }
        }
        res.json(response)
    })
})

app.delete("/guru/:id", (req,res) => {
    let data = {
        id_guru : req.params.id
    }

    let sql = "delete from guru where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error) {
            response = {
                message : error.message
            }
        }else{
            response = {
                message : result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

//membuat web server dengan port 8000
app.listen(8000, () => {
    console.log("server run on port 8000")
})