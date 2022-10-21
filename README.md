# kahschiev.com

A personal website/portfolio written using webpack and vanilla JS.

<br>

### Dependencies
- Handlebars 4.7.7 (currently installed globaly, therefore is unlisted in package.json).
- cypress

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

## Integration tests
***Tests done with cypress***
</br>

#### Core
- ***#root tests***
    - [x] #root has the correct children and child count
    </br></br>
- **Header**
    - ***Header tests***
        - [x] *Header has the correct children and child count*
        - [x] *Header ghost title works*

    - ***Nav***
        - ***Nav content***
            - [x] *Nav has the correct children and child count*
        - ***Nav links url change***
            - [x] *Nav links change the url appropriately*
            - [x] *Nav Github link connects (200), and has the propper attributes*
        - ***Nav main link***
            - [x] *Main link shows and hides appropriately across all pages*
    </br>
    - ***Language bar***
        - ***Language bar content***
            - [x] *Language bar has the correct children and child count*
        - ***Language bar toggle***
            - [x] *Language bar opens and closes correctly*
        - ***Language bar arrow***
            - [x] *Language bar arrow switches points correctly*
        - ***Language change***
            - [x] *Language changes correctly on all dynamic pages and core components EN -> BG -> IT -> EN*
    </br></br>
- **Footer**
    - ***Footer tests***
        - [x] *Footer has the correct children and child count*
</br></br>

#### Pages
- **Main page**
    - ***Main page tests***
        - [x] *Main has the correct children and child count*
        - [x] *Main top section has the correct children*
        - [x] *Main stack section has the correct children*
    </br></br>
- **Certificates page**
    - **Certificates page has the correct children and child count**
        - [x] *Title*
        - [x] *Section*
        - [x] *Rows all present*
        - [x] *Certificates all present, and are the correct ones*
        - [x] *Certificate zoom buttons all present*
    </br>
    - **Big certificates**
        - [x] *Big certificates all display correctly, are the correct ones, and have the correct pdfs*
    </br></br>
- **Projects page**
    - **Projects page tests**
        - [x] *Projects page has the correct children, and links work propperly*