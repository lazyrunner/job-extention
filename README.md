# Job description skills amalgamator
Adds a generate skills button at the end of the job description. After clicking it send the job description to the server that cleans the data,
tokenizes it and matches it to existing skills. The UI then displays the matched skills.

-----

## Django Server
### Install
``` pip install django djangorestframework nltk ```

``` python ```

``` >>> import nltk ```

``` >>> nltk.download() ```

``` >>> exit() ```

``` pip install django-cors-headers ```

### Start Server
``` python .\ExtentionServer\manage.py runserver ```

-----

## Chrome Extention
### Install
1. Go to [Chrome Extentions](chrome://extensions/).
1. Enabled Developer mode
1. Select "Load unpacked"
1. Select folder 'chrome extention' of this repo 

### Todo List

- [x] Create UI Extention
- [x] Create Server
- [x] Connect extention to server
- [x] Display results
- [x] Organize results
- [x] Generate custom resume based on skills selected
