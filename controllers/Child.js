import Child from "../models/childModel.js";

export const getChild = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Child.findAll({
                attributes:['uuid','name','berat','tinggi','tglLahir','umur','calori','gender','beratLahir','tinggiLahir','lingkarKepala'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Child.findAll({
                attributes:['uuid','name','berat','tinggi','tglLahir','umur','calori','gender','beratLahir','tinggiLahir','lingkarKepala'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const getChildById = async (req, res) =>{
    try {
        const child = await Child.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Child.findOne({
                attributes:['uuid','name','berat','tinggi','tglLahir','umur','calori','gender','beratLahir','tinggiLahir','lingkarKepala'],
                where:{
                    id: product.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Product.findOne({
                attributes:['uuid','name','berat','tinggi','tglLahir','umur','calori','gender','beratLahir','tinggiLahir','lingkarKepala'],
                where:{
                    [Op.and]:[{id: child.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const createChild = async (req, res) =>{
    const {name,berat,tinggi,tglLahir,umur,calori,gender,beratLahir,tinggiLahir,lingkarKepala} = req.body;
    try {
        await Child.create({
            name: name,
            berat: berat,
            tinggi: tinggi,
            tglLahir: tglLahir,
            umur: umur,
            calori: calori,
            gender: gender,
            beratLahir: beratLahir,
            tinggiLahir: tinggiLahir,
            lingkarKepala: lingkarKepala,
            userId: req.userId
        });
        res.status(201).json({msg: "Child Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const updateChild = async (req, res) =>{
    try {
        const child = await Child.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name,berat,tinggi,tglLahir,umur,calori,gender,beratLahir,tinggiLahir,lingkarKepala} = req.body;
        if(req.role === "admin"){
            await Product.update({name,berat,tinggi,tglLahir,umur,calori,gender,beratLahir,tinggiLahir,lingkarKepala},{
                where:{
                    id: child.id
                }
            });
        }else{
            if(req.userId !== child.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Product.update({name,berat,tinggi,tglLahir,umur,calori,gender,beratLahir,tinggiLahir,lingkarKepala},{
                where:{
                    [Op.and]:[{id: child.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Child updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
export const deleteChild = async (req, res) =>{
    try {
        const child = await Child.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name,berat,tinggi,tglLahir,umur,calori,gender,beratLahir,tinggiLahir,lingkarKepala} = req.body;
        if(req.role === "admin"){
            await Child.destroy({
                where:{
                    id: product.id
                }
            });
        }else{
            if(req.userId !== child.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Product.destroy({
                where:{
                    [Op.and]:[{id: child.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Child deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}
