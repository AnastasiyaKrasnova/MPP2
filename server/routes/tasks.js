const router=require('express').Router();
const Task=require('../controllers/tasks');


router.post('/tasks', async (req,res)=>{

    const saved=await Task.add(req.body);
   if (saved)
        res.status(200).send(saved);
   else
        res.status(400).send('json data is incorrect');
});

router.get('/tasks', async (req,res)=>{

     if (!req.query.status){
          const saved=await Task.listAll();
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of tasks');
     }
     else{
          const saved=await Task.filterByStatus(req.query.status);
          if (saved)
               res.status(200).send(saved);
          else
               res.status(400).send('DB error while getting list of tasks by tasks');
     }
     
 });

router.put('/tasks', async (req,res)=>{

     console.log(req.body)
     const saved=await Task.update(req.body);
    if (saved){
          res.status(200).send(saved);
    }     
    else
         res.status(400).send('DB error while updating date');
 });

router.delete('/tasks', async (req,res)=>{

     const saved=await Task.delete(req.query.id);
     if (saved)
         res.status(200).send(saved);
     else
         res.status(400).send('DB error while deleting task');
 });


module.exports=router;