<?php
$dbHost='Localhost';
$dbUsername='root';
$dbPassword='alunolab';
$dbName='pousada2';


$conexao=new mysqli($dbHost,$dbUsername,$dbPassword,$dbName);

if ($conexao->connect_errno)
{
    echo "erro";
}
else
{
    echo"conexão efetuada com susesso";
}
?>