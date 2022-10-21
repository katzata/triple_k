# kahschiev.com

A personal website/portfolio written using webpack and vanilla JS.

<br>

### Dependencies
- Handlebars 4.7.7 (currently installed globaly, therefore is unlisted in package.json).

#### Details
- Further details about the functionality can be found within the components themselves.

- Works on all major browsers.

</br>

## Folder structure
```
root
└───src
│   └───assets
│   └───components
│   │   └───core
│   │   └───pages
│   │   
│   └───localization
│   └───router
```

</br></br>

### Integration tests

#### Core
- ***#root tests***
    * [x] #root has the correct children and child count

    </br>
- **Header**
    - ***Header tests***
        * [x] *Header has the correct children and child count*
        * [x] *Header ghost title works*
    
    </br>
    - ***Nav***
        - *Nav content*
            * [x] *Nav has the correct children and child count*
            
        - *Nav links url change*
            * [x] *Nav links change the url appropriately*
            * [x] *Nav Github link connects (200), and has the propper attributes*

        - *Nav main link*
            * [x] *Main link shows and hides appropriately across all pages*
    
    </br>
    - ***Language bar***
        - *Language bar content*
            * [x] *Language bar has the correct children and child count*
        - *Language bar toggle*
            * [x] *Language bar opens and closes correctly*
            
        - *Language bar arrow*
            * [x] *Language bar arrow switches points correctly*
            
        - *Language change*
            * [x] *Language changes correctly on all dynamic pages and core components EN -> BG -> IT -> EN*

    </br>
- **Footer**
    - ***Footer tests***
        * [x] *Footer has the correct children and child count*