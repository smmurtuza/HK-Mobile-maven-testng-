package testcases;

import java.time.Duration;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.Test;
//import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriverException;

public class mytestcases extends BaseClass{

    @Test
    public void testlogin1() {
        try {
        	//Thread.sleep(15000);
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
            WebElement plus = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/btn_add")));
            plus.click();
            
            WebElement amount = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/tv_currency")));
            amount.sendKeys("15000");

            WebElement category = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.RelativeLayout[2]/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.RelativeLayout/android.widget.ImageView")));
            category.click();
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

            WebElement account = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.RelativeLayout[3]/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.RelativeLayout/android.widget.ImageView")));
            account.click();

            WebElement finish = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/btn_finish")));
            finish.click();
            
//            WebElement skip = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout[1]/android.widget.RelativeLayout/android.widget.ScrollView/android.widget.RelativeLayout/android.widget.FrameLayout[2]/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.view.View[2]")));
//            skip.click();
//            
//            WebElement skip1 = wait.until(ExpectedConditions.elementToBeClickable
//            		(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout[1]/android.widget.RelativeLayout/android.widget.ScrollView/android.widget.RelativeLayout/android.widget.FrameLayout[2]/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.RelativeLayout/android.view.View[2]"))); // Replace "" with actual ID
//            skip1.click();
//            
//            WebElement skip3 = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout[1]/android.widget.RelativeLayout/android.widget.ScrollView/android.widget.RelativeLayout/android.widget.FrameLayout[1]/android.widget.LinearLayout")));
//            skip3.click();
            
            
            System.out.println("Test1 completed");
        } catch (WebDriverException e) {
            System.err.println("WebDriverException caught: " + e.getMessage());
        }
    }

    @Test
    public void test2() {
        try {
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(20));
            
//            WebElement plus = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/btn_add")));
//            plus.click();

            WebElement amount = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/tv_currency")));
            amount.sendKeys("15000");

            WebElement category = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.RelativeLayout[2]/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.RelativeLayout/android.widget.ImageView")));
            category.click();
            driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

            WebElement account = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/androidx.drawerlayout.widget.DrawerLayout/android.view.ViewGroup/android.widget.LinearLayout/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ScrollView/android.widget.LinearLayout/android.widget.RelativeLayout[3]/androidx.recyclerview.widget.RecyclerView/android.widget.LinearLayout[1]/android.widget.RelativeLayout/android.widget.ImageView")));
            account.click();

            WebElement finish = wait.until(ExpectedConditions.elementToBeClickable(By.id("com.jbs.hk.c:id/btn_finish")));
            finish.click();

            System.out.println("Test2 completed");
        } catch (WebDriverException e) {
            System.err.println("WebDriverException caught: " + e.getMessage());
        } 
    }

    @AfterMethod
    public void tearDown() {
        if (driver != null) {
            try {
                driver.quit();
            } catch (WebDriverException e) {
                System.err.println("Failed to quit the driver: " + e.getMessage());
            }
        }
    }
}
