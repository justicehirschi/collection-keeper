Server: https://collection-keeper-jhirschi.herokuapp.com
------------------
Client: https://jhirschi123.github.io/
------------------

## Resource: Coins
------------------
## Attributes
* date
* type
* condition
* mint_mark
* material
-------------------
## Database Schema
-------------------
```
coinSchema = new mongoose.Schema({
    date: {
         type: Number,
         required: [true, "All coins must have a date."]
    },
    type: {
         type: String,
         required: [true, "All coins must have a type."]
    },
    condition: {
        type: String,
        required: [true, "All Coins must have a condition."]
    },
    mint_mark: {
        type: String,
        required: [true, "All Coins must have a mint mark."]
    },
    material: {
        type: String,
        required: [true, "All Coins must have a material."]
    }
});
```
## REST Endpoints:
Name | Method | Path
-----|--------|------
List | GET | /coins
Create | POST | /coins
Delete | DELETE | /coins/id
Update | PUT | /coins/id
