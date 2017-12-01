CREATE TABLE [dbo].[Customers] (
    [Id]                INT           NOT NULL,
    [FirstName]         NVARCHAR (50) NULL,
    [LastName]          NVARCHAR (50) NULL,
    [PreviouslyOrdered] BIT           NULL,
    [WebCustomer]       BIT           NULL,
    [DateActive]        DATE          NULL,
    [IsPalindrome]      BIT           NULL
);
