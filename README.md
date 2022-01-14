# Introduction 
TODO: Give a short introduction of your project. Let this section explain the objectives or the motivation behind this project. 

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process
2.	Software dependencies
3.	Latest releases
4.	API references

# Build and Test
TODO: Describe and show how to build your code and run the tests. 

# Contribute
TODO: Explain how other users and developers can contribute to make your code better. 

## Working between your Branch and Staging Branch
 - Open/Create your project directory
 - Then do the following:
### $ git clone https://bps-technology@dev.azure.com/bps-technology/TransactionProcessingSystem/_git/TransactionProcessingSystem

###    $ git branch 
####    * Taiwo
####    main
    
###    $ git checkout Staging
####   Switched to a new branch 'Staging'
####   Branch 'Staging' set up to track remote branch 'Staging' from 'origin'.

###   $ git checkout Taiwo
####   Switched to branch 'Taiwo'
####   Your branch is up to date with 'origin/Taiwo'.

###   $ git branch
####   Staging
####   * Taiwo
####   main  
    
####   < Do your coding >
    
###   $ git add .

###   $ git commit -m "added  a testfile to push to staging branch"

###   $ git push

###   $ git push origin Staging


###   $ git checkout Staging
####   Switched to branch 'Staging'
####   Your branch is up to date with 'origin/Staging'.

###   $ git merge origin/Taiwo
####   Updating 10f06c8..772a3da
####   Fast-forward
####   testfile.js | 0
####   1 file changed, 0 insertions(+), 0 deletions(-)
####   create mode 100644 testfile.js
    
###   $ git push
####   Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
####   To https://dev.azure.com/bps-technology/TransactionProcessingSystem/_git/TransactionProcessingSystem
####   10f06c8..772a3da  Staging -> Staging